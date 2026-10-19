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

import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { brokerInstances } from "/DM_IG/Javascript/Subsystems/Brokers.js";

export const eventFeed = [];
export const buildingListeners = [];
export const buttonListeners = [];

export function initListeners() {
	
	const settingsButtonID = document.getElementById("settings_button");
	const researchButtonID = document.getElementById("research_button");
	const productionButtonID = document.getElementById("production_button");
	const upgradesButtonID = document.getElementById("upgrades_button");
	const managersButtonID = document.getElementById("managers_button");
	
	// Change view to Production View
	productionButtonID.addEventListener("click", function () {
		var view = document.getElementById("view-production");
		
		if (view.style.display === "none") {
			document.getElementById("view-research").style.display = "none";
			document.getElementById("view-upgrades").style.display = "none";
			document.getElementById("view-managers").style.display = "none";
			document.getElementById("view-settings").style.display = "none";
			
			view.style.display = "flex";
			gameState.currentView = "production";
			
		}
	});

	// Change view to Research View 
	researchButtonID.addEventListener("click", function () {
		var view = document.getElementById("view-research");
		
		if (view.style.display === "none") {
			document.getElementById("view-production").style.display = "none";
			document.getElementById("view-upgrades").style.display = "none";
			document.getElementById("view-managers").style.display = "none";
			document.getElementById("view-settings").style.display = "none";
			
			view.style.display = "flex";
			gameState.currentView = "research";
			
		}
	});
	
	// Change view to Upgrades View 
	upgradesButtonID.addEventListener("click", function () {
		var view = document.getElementById("view-upgrades");
		
		if (view.style.display === "none") {
			document.getElementById("view-research").style.display = "none";
			document.getElementById("view-production").style.display = "none";
			document.getElementById("view-managers").style.display = "none";
			document.getElementById("view-settings").style.display = "none";
			
			view.style.display = "flex";
			gameState.currentView = "upgrades";
			
		}
	});
	
	// Change view to Managers View
	managersButtonID.addEventListener("click", function () {
		var view = document.getElementById("view-managers");
		
		if (view.style.display === "none") {
			document.getElementById("view-research").style.display = "none";
			document.getElementById("view-upgrades").style.display = "none";
			document.getElementById("view-production").style.display = "none";
			document.getElementById("view-settings").style.display = "none";
			
			view.style.display = "flex";
			gameState.currentView = "managers";
			
		}
	});
	
	// Change view to Settings View
	settingsButtonID.addEventListener("click", function () {
		var view = document.getElementById("view-settings");
		
		if (view.style.display === "none") {
			document.getElementById("view-research").style.display = "none";
			document.getElementById("view-upgrades").style.display = "none";
			document.getElementById("view-managers").style.display = "none";
			document.getElementById("view-production").style.display = "none";
			
			view.style.display = "flex";
			gameState.currentView = "settings";
			
		}
	});
	
	// Building Listeners
	
	// Punchcard building - on by default
	let punchcardButtonID = document.getElementById(buildingInstances[0].ui.elementID);
	
	punchcardButtonID.addEventListener("click", function () {
		let time = Date.now;
		let punchcardTimeClicked = buildingInstances[0].timeClicked;
		if ((time - punchcardTimeClicked) > buildingInstances[0].production.clickInterval) {
			buildingInstances[0].timeClicked = time;
			alert("Punchcard clicked at " + "time");
		} else {
			if (!buildingInstances[0].isClicked) {
				buildingInstances[0].timeClicked = time;
				alert("Punchcard clicked at " + time);
			} else {
				alert("Punchcard clicked too early!");
			}
		}
	});
	
	// Check for other building unlocks (from saved game?)
	
	// Data Broker Listeners
	
	// Mother Broker - on by default
	
	let brokerMotherButtonID = document.getElementById(brokerInstances[0].ui.elementID);
	
	brokerMotherButtonID.addEventListener("click", function() {
		alert("Your mother!");
	});
	
}

export function createListener(target, type) {
	let listenerID = document.getElementById(target);
}

export function pushEvent(desc, target) {
	eventFeed.push(desc);
	
}

