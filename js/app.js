(function() {

	/* Events from UI */


	var region = document.getElementById('region');
	var picker = document.getElementById('dataCenterPicker');
	var dataCenter = picker.options[picker.selectedIndex].value;

	picker.addEventListener('change', function(e){
		dataCenter = picker.options[picker.selectedIndex].value;
		console.log(dataCenter);
	}, false);

	var isRunning = true;
	var button = document.getElementById('toggle');

	button.addEventListener('click', function(e){
		if(isRunning) {
			pubnub.unsubscribe({
				channel: channel
			});
			button.value = 'Stream again';
			isRunning = false;
		} else {
			getData();
			button.value = 'Stop me!';
			isRunning = true;
		}
		
	}, false);



	/* D3 Bubble Chart */

	var diameter = Math.min(document.getElementById('chart').clientWidth, window.innerHeight - document.querySelector('header').clientHeight) - 20;

	var svg = d3.select('#chart').append('svg')
		.attr('width', diameter)
		.attr('height', diameter);

	var bubble = d3.layout.pack()
		.size([diameter, diameter])
		.value(function(d) {return d.size;}) // new data is loaded to bubble layout
		.padding(3);

	function drawBubbles(m) {

		if(m.region !== dataCenter) return;

		region.textContent = m.region;

		// generate data with calculated layout values
		var nodes = bubble.nodes(processData(m))
			.filter(function(d) { return !d.children; }); // filter out the outer bubble

		// assign new data to existing DOM 
		var vis = svg.selectAll('circle')
			.data(nodes, function(d) { return d.name; });

		// enter data -> remove, so non-exist selections for upcoming data won't stay -> enter new data -> ...

		// To chain transitions, 
		// create the transition on the updating elements before the entering elements 
		// because enter.append merges entering elements into the update selection

		var duration = 500;
		var delay = 0;

		// update - this is created before enter.append. it only applies to updating nodes.
		vis.transition()
			.duration(duration)
			.delay(function(d, i) {delay = i * 7; return delay;}) 
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.style('opacity', 1); // force to 1, so they don't get stuck below 1 at enter()

		// enter - only applies to incoming elements (once emptying data)	
		vis.enter().append('circle')
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return 0; })
			.attr('class', function(d) { return d.className; })
			.transition()
			.duration(duration * 1.2)
			.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.style('opacity', 1);

		// exit
		vis.exit()
			.transition()
			.duration(duration)
			.attr('transform', function(d) { 
				var dy = d.y - diameter/2;
				var dx = d.x - diameter/2;
				var theta = Math.atan2(dy,dx);
				var destX = diameter * (1 + Math.cos(theta) )/ 2;
				var destY = diameter * (1 + Math.sin(theta) )/ 2; 
				return 'translate(' + destX + ',' + destY + ')'; })
			.attr('r', function(d) { return 0; })
			.remove();
	}



	
	/* PubNub */

	var channel = 'rts-xNjiKP4Bg4jgElhhn9v9';

	var pubnub = PUBNUB.init({
		subscribe_key: 'e19f2bb0-623a-11df-98a1-fbd39d75aa3f',
		ssl: (('https:' == document.location.protocol) ? true : false)
	});

	function getData() {
		var i = 0;
		pubnub.subscribe({
			channel: channel,
			callback: function(m) {
				// i++; 
				// if(i === 1 || i%10 === 0) {
				// 	drawBubbles(m);
				// }	
				drawBubbles(m);		
			}
		});
	}

	function processData(data) {
		if(!data) return;

		var obj = data.countries_msg_vol;

		var newDataSet = [];

		for(var prop in obj) {
			newDataSet.push({name: prop, className: prop.toLowerCase().replace(/ /g,''), size: obj[prop]});
		}
		return {children: newDataSet};
	}



	getData();
	
})();