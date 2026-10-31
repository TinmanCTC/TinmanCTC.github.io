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

import { gameState, checkUnlocks } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";

import { BLDG_IDS } from "/DM_IG/Javascript/Data/Buildings.js";
import { BROKERS_ID, BROKERS_DEFS } from "/DM_IG/Javascript/Data/Brokers.js";

import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { resourceInstances, resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";

export const eventFeed = [];
export const eventListeners = {};

// eventManager onEvent function 
// Checks if event is pre-defined and passes associated event code to run
export function onEvent(eventName, carryFunction) {
	
	if (!eventListeners[eventName]) {
		eventListeners[eventName] = [];
	}
	
	eventListeners[eventName].push(carryFunction);
}

// eventManager emitEvent function
// Checks if eventName exists and if so passes the associated data to the event function
export function emitEvent(eventName, payload) {
	
	if (!eventListeners[eventName]) {
		return -1;
	}
	
	eventListeners[eventName].forEach(carryFunction => {
		carryFunction(payload);
	});
}



export function initListeners() {
	// View Toggle Buttons
	const settingsButtonID = document.getElementById("settings_button");
	const researchButtonID = document.getElementById("research_button");
	const productionButtonID = document.getElementById("production_button");
	const upgradesButtonID = document.getElementById("upgrades_button");
	const managersButtonID = document.getElementById("managers_button");
	
	
	// Default listeners 
	
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
	punchcardButtonID.addEventListener("click", function () {
		buildingManager.clickBuilding(BLDG_IDS.PUNCHCARD);
	});
	// Check for other building unlocks (from saved game?)
	
	// Data Broker Listeners
	
	// Mother Broker - on by default	
	brokerMotherButtonID.addEventListener("click", function() {
		brokerManager.sellBits(BROKERS_ID.MOTHER);
	});
}

export function createListener(source, type, target) {
		
}

export function pushEvent(desc, target) {
	console.log("entering pushevent(desc,target)");
	console.log("desc: " + desc);
	console.log("target: " + target);
	
	
	const cashDisplay = document.getElementById(resourceInstances[0].elementID);
	const bitsDisplay = document.getElementById(resourceInstances[1].elementID);
	const wattsDisplay = document.getElementById(resourceInstances[2].elementID);
	
	// Store Displays
	const storePnchBuy = document.getElementById(buildingInstances[0].ui.buyBtnID);
	const storePnchSell = document.getElementById(buildingInstances[0].ui.sellBtnID);
	const storePnchQty = document.getElementById(buildingInstances[0].ui.qtyPnlID);

	// Production Buildings
	const punchcardButtonID = document.getElementById(buildingInstances[0].ui.elementID);

	// Data Brokers
	//const brokerMotherButtonID = document.getElementById(brokerInstances[0].ui.elementID);
	
	switch(desc) {
		case "cashChange":
			cashDisplay.dispatchEvent(cashTick);
			checkUnlocks();
			break;
		case "wattsChange":
			wattsDisplay.dispatchEvent(wattsTick);
			checkUnlocks();
			break;
		case "bitsChange":
			bitsDisplay.dispatchEvent(bitsTick);
			checkUnlocks();
			break;
		case "qtyChange":
			switch (target) {
				case buildingInstances[BLDG_IDS.PUNCHCARD].ui.qtyPnlID:
					var panel = document.getElementById(target);
					panel.dispatchEvent(qtyDelta);
					break;
				case buildingInstances[BLDG_IDS.DESKTOP].ui.qtyPnlID:
					var panel = document.getElementById(target);
					panel.dispatchEvent(qtyDelta);
					break;
				default:
					console.log("qtyChange default case");
			}
			
			checkUnlocks();
			break;
		default:
			console.log("pushEvent() switch(desc) default case");
			
	}
	
}

