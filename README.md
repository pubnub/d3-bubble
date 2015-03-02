# D3 Bubble Chart with PubNub Live JSON Demo


This demo showcases a data visualization, written with [D3.js][d3] and [PubNub][pubnub] data streaming network JavaScript API.

You may say, "OK, it looks pretty but what does this chart really mean?" - Well, it shows message volume per country from an each PubNub data center.
The size of each bubble corresponds with volume. 

I initentionally did not add labels to the bubbles to avoid clutter, also to simplify the tutorial and to make it visually prettier. This makes you think this chart is useless, but I keep it this way. It is your job to make your own useful charts. I am just providing you ideas :-)

Anyway, the country names are not labeled, however, you can open a dev console to see abbriviated country codes as class name.

## Turorial

[Fun with D3js: Data Visualization Eye Candy with Streaming JSON][tut-pubnub]

## Demo

[Try it now!][demo]

 
![Screencast](http://pubnub.com/blog/wp-content/uploads/2014/09/d3-bubble-demo.gif "Screencast")


[d3]: http://d3js.org/
[demo]: http://pubnub.github.io/d3-bubble
[pubnub]: http://www.pubnub.com/docs/javascript/javascript-sdk.html
[tut]: http://www.developer.com/java/fun-with-d3.js-data-visualization-eye-candy-with-streaming-json.html
[tut-pubnub]: http://www.pubnub.com/blog/fun-with-d3js-data-visualization-eye-candy-with-streaming-json/
