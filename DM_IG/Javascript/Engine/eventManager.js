---
permalink: /DM_IG/Javascript/Engine/eventManager.js
title: "Data Miner Idle Game"
layout: page
---
/* Module: eventManager.js
*  Purpose: Handle I/O
*  
*  Dependencies: Game state, most other modules
*  
*  
*/


export function initListeners() {
	
	const settingsButtonID = document.getElementById("settings_button");
	const researchButtonID = document.getElementById("research_button");
	const productionButtonID = document.getElementById("production_button");
	const upgradesButtonID = document.getElementById("upgrades_button");
	const managersButtonID = document.getElementById("managers_button");
	
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
	
	// Building Listeners
	
	
}

