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

import { BUILDING_ID } from "/DM_IG/Javascript/Data/Buildings.js";
import { BROKERS_ID, BROKERS_DEFS } from "/DM_IG/Javascript/Data/Brokers.js";

import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { resourceInstances, resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";

export const eventFeed = [];
export const buildingListeners = [];
export const buttonListeners = [];

export const cashTick = new Event("cashChange");
export const bitsTick = new Event("bitsChange");
export const wattsTick = new Event("wattsChange");
export const qtyDelta = new Event("qtyChange");

export function initListeners() {
	// Default listeners 
	// View Toggle Buttons
	const settingsButtonID = document.getElementById("settings_button");
	const researchButtonID = document.getElementById("research_button");
	const productionButtonID = document.getElementById("production_button");
	const upgradesButtonID = document.getElementById("upgrades_button");
	const managersButtonID = document.getElementById("managers_button");

	// Resource Displays
	const cashDisplay = document.getElementById(resourceInstances[0].elementID);
	const bitsDisplay = document.getElementById(resourceInstances[1].elementID);
	const wattsDisplay = document.getElementById(resourceInstances[2].elementID);
	
	// Store Displays
	const storePnchBuy = document.getElementById("store-pnch-buy");
	const storePnchSell = document.getElementById("store-pnch-sell");
	const storePnchQty = document.getElementById("store-pnchcrd-qty");
	
	// Production Buildings
	const punchcardButtonID = document.getElementById(buildingInstances[0].ui.elementID);
	
	// Data Brokers
	const brokerMotherButtonID = document.getElementById(brokerInstances[0].ui.elementID);	
	
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
		buildingManager.disableBuilding(0);		
		setTimeout(() => buildingManager.enableBuilding(0), buildingManager.getClickInterval(0));
		
		var amt = buildingManager.getOutput(0);
		resourceManager.addBits(amt);
	});
	
	// Check for other building unlocks (from saved game?)
	
	// Data Broker Listeners
	
	// Mother Broker - on by default	
	brokerMotherButtonID.addEventListener("click", function() {
		brokerManager.sellBits(BROKERS_ID.MOTHER);
	});
	
	
	// Resource Listeners	
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
	
	// Store Listeners - Punchcard Only on default
	storePnchBuy.addEventListener("click", function() {
		buildingManager.buyBuilding(0,1);
		pushEvent("qtyChange", storePnchQty);		
	});
	
	storePnchSell.addEventListener("click", function() {
		buildingManager.sellBuilding(0,1);
		pushEvent("qtyChange", storePnchQty);
	});
	
	storePnchQty.addEventListener("qtyChange", function() {
		storePnchQty.innerHTML = buildingInstances[0].quantity;
	});
	
	
}

export function createListener(target, type) {
	let listenerID = document.getElementById(target);
}

export function pushEvent(desc, target) {
	
	const cashDisplay = document.getElementById(resourceInstances[0].elementID);
	const bitsDisplay = document.getElementById(resourceInstances[1].elementID);
	const wattsDisplay = document.getElementById(resourceInstances[2].elementID);
	
	const storePnchQtyDisplay = document.getElementById("store-pnchcrd-qty");
	
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
			storePnchQtyDisplay.dispatchEvent(qtyDelta);
			checkUnlocks();
			break;
		default:
			
	}
	
}

