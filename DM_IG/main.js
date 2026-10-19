---
permalink: /DM_IG/main.js
title: "Data Miner Idle Game"
layout: page
---
import { initListeners } from "./Javascript/Engine/eventManager.js";
import { initBuildings } from "./Javascript/Subsystems/Buildings.js";
import { initUI } from "./Javascript/Interface/UI.js";
import { initBrokers } from "./Javascript/Subsystems/Brokers.js";
import { tickTock, drift, floaters } from "./Javascript/Engine/Helpers.js";

function initGame() {	
	let i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
	
	initUI();
	initBuildings();
	initBrokers();
	initListeners();
	
	setInterval(tickTock, 100);
	setInterval(drift, 15000);
}

initGame();