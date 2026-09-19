const floaters = ["Hello World!", "Nobody here but us chickens!", "I wish I wish I was a fish!", "BYOB(Bring Your Own Bits)", "Why was six afraid of seven? Because seven ate nine!", "A long time ago, in a galaxy far, far away...", "Knock, knock!", "Orange you glad I didn't say banana?", "Banana!"];

function init() {
	import("/DM_IG/Javascript/Subsystems/Buildings.js");
	
	i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
	
	initListeners();
	initBuildings();
	
	setInterval(tickTock, 100);
	setInterval(drift, 15000);
}