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
import { resourceInstances } from "/DM_IG/Javascript/Subsystems/Resources.js";

export const eventFeed = [];
export const buildingListeners = [];
export const buttonListeners = [];

export const cashTick = new Event("cashChange");
export const bitsTick = new Event("bitsChange");
export const wattsTick = new Event("wattsChange");

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
		
		
		
	});
	
	// Check for other building unlocks (from saved game?)
	
	// Data Broker Listeners
	
	// Mother Broker - on by default
	
	let brokerMotherButtonID = document.getElementById(brokerInstances[0].ui.elementID);
	
	brokerMotherButtonID.addEventListener("click", function() {
		alert("Your mother!");
	});
	
	// Resource Listeners
	
	let cashDisplay = document.getElementById(resourceInstances[0].elementID);
	let bitsDisplay = document.getElementById(resourceInstances[1].elementID);
	let wattsDisplay = document.getElementById(resourceInstances[2].elementID);
	
	cashDisplay.addEventListener("cashChange", function() {
		cashDisplay.innerHTML = gameState.money;
	});
	cashDisplay.dispatchEvent(cashTick);
	
	bitsDisplay.addEventListener("bitsChange", function() {
		bitsDisplay.innerHTML = gameState.bits;
	});
	bitsDisplay.dispatchEvent(bitsTick);
	
	wattsDisplay.addEventListener("wattsChange", function() {
		wattsDisplay.innerHTML = (gameState.powerGen - gameState.powerCon);
	});
	wattsDisplay.dispatchEvent(wattsTick);
	
	
}

export function createListener(target, type) {
	let listenerID = document.getElementById(target);
}

export function pushEvent(desc, target) {
	eventFeed.push(desc);
	
}

