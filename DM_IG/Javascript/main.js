---
permalink: /DM_IG/Javascript/main.js
title: "Data Miner Idle Game"
layout: page
---


const floaters = ["Hello World!", "Nobody here but us chickens!", "I wish I wish I was a fish!", "BYOB(Bring Your Own Bits)", "Why was six afraid of seven? Because seven ate nine!", "A long time ago, in a galaxy far, far away...", "Knock, knock!", "Orange you glad I didn't say banana?", "Banana!"];

function init() {	
	import data from "/DM_IG/Javascript/Data/Buildings.json" with: { type: "json" };
	
	i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
	
	initListeners();
	initBuildings();
	
	setInterval(tickTock, 100);
	setInterval(drift, 15000);
}