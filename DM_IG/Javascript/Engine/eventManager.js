---
permalink: /DM_IG/Javascript/Engine/eventManager.js
title: "Data Miner Idle Game"
layout: page
---

let settingsButtonID = document.getElementById("settings_button");
let researchButtonID = document.getElementById("research_button");
let productionButtonID = document.getElementById("production_button");
let upgradesButtonID = document.getElementById("upgrades_button");
let managersButtonID = document.getElementById("managers_button");

function initListeners() {
	
	// Change view to Production View
	productionButtonID.addEventListener("click", function () {
		alert("Production!");
	});

	// Change view to Research View 
	researchButtonID.addEventListener("click", function () {
		alert("Research!");
	});
	
	// Change view to Upgrades View 
	upgradesButtonID.addEventListener("click", function () {
		alert("Upgrades!");
	});
	
	// Change view to Managers View
	managersButtonID.addEventListener("click", function () {
		alert("Managers!");
	});
	
	// Change view to Settings View
	settingsButtonID.addEventListener("click", function () {
		alert("Settings!");
	});
}

