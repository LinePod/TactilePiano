
var linepodNS = "http://hpi.de/baudisch/linepod";
const lastPlayed = "linepod:lastPlayed";

d3.namespaces.linepod = linepodNS;

var hoveredTone = "";
var removedItems = {};

var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("viewBox", "0 0 " + width + " " + height)
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("y",paperA4Yoffset)
.attr("version", 1.1)
.attr("xmlns:linepod", linepodNS)
.attr("xmlns","http://www.w3.org/2000/svg")
.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
.attr("id","svg");
//.on("click", playTone);

var defs = svg.append("defs")

defs.append("pattern")
	.attr("id", "keyPlateau")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 2)
	.attr("height", keyHeight)
	.attr("patternUnits", "userSpaceOnUse")
	.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", keyHeight)
		.attr("stroke", "black");



var tones = ["c","d","e","f","g","a","h"];
var blackTones = ["cis","dis","fis","gis","ais"];
var i = 0;
svg.selectAll(".keys")
.data(tones).
enter().append("rect")
.attr("class","keys")
.attr("x", function(){
    var x = i*keyWidth + i * keyOffset;
    i=i+1;
    return x;
}).attr("y",115)
.attrs(normalKeyAttrs)
.on("mouseover", onMouseOverKey)
.attr(lastPlayed, Date.now());


svg.selectAll(".keys")
.data(tones).
enter().append("line")


svg.selectAll(".blackKeys")
.data(blackTones).
enter().append("rect")
.attr("class","blackKeys")
.attr("x", function(d){
    var x = 0;
    var i = 0;
    console.log("data " + d);
    switch(d){

    	case "cis": i = 1; break;
		case "dis": i = 2; break;
    	case "fis": i = 4; break;
    	case "gis": i = 5; break;
    	case "ais": i = 6; break;


    }
    x = (i-1) * keyWidth + i * keyOffset + (1/2) * keyWidth + blackKeyOffset; //(i-1) * keyOffset + blackKeyOffset
    return x;
}).attr("y",30)
.attrs(blackKeyAttrs)
.on("mouseover", onMouseOverKey)
.attr(lastPlayed, Date.now());


function onMouseOverKey(tone){
	hoveredTone = tone;
	var el = d3.select(this);
    console.log(el.attr(lastPlayed));
	if (Date.now() - el.attr(lastPlayed) > 200){
    	Android.playTone(tone)
	    el.attr(lastPlayed, Date.now());
	}
}

function onMouseOverBlackKey(tone){

    hoveredTone = tone;
	var el = d3.select(this);
	if (Date.now() - el.attr(lastPlayed) > 500){
    	Android.playTone(tone)
	    el.attr(lastPlayed, Date.now());
	}
}

function playTone(){
    console.log(hoveredTone)

}
