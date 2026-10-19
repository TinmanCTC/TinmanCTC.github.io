---
permalink: /DM_IG/Javascript/Interface/UI.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Interface/UI.js
 * 
 * 
 */
 
import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { INTERFACE_DEFS } from "/DM_IG/Javascript/Interface/Components.js";

export function initUI() {
	// Initialize view buttons
	addButton(INTERFACE_DEFS[0], "view-buttons");
	
	// Initialize production buttons
	addButton(INTERFACE_DEFS[1], "production-buttons");
	
	// Initialize broker buttons
	addButton(INTERFACE_DEFS[2], "broker-buttons");
	
	// Initialize Resource Displays
	addDisplay(INTERFACE_DEFS[3], "resource-bar");
	
}

export function addButton(target, id) {
	let retVal = 0;
	
	switch (id) {
		case "view-buttons":
			document.getElementById(id).innerHTML += target.Production_Btn;
			document.getElementById(id).innerHTML += target.Research_Btn;
			document.getElementById(id).innerHTML += target.Upgrades_Btn;
			document.getElementById(id).innerHTML += target.Managers_Btn;
			document.getElementById(id).innerHTML += target.Settings_Btn;
			
			retVal = 1;
			break;
		case "production-buttons":
			document.getElementById(id).innerHTML += target.Punchcard_Btn;
			
			// Check if other buildings are unlocked and populate them if so
			
			
			retVal = 2;
			break;
		case "broker-buttons":
			document.getElementById(id).innerHTML += target.brokerMother_Btn;
			
			retVal = 3;
			break;
		default:
			retVal = -1;
	}
	
	return retVal;
}

export function addDisplay(target, id) {
	let retVal = 0;
	
	switch (id) {
		case "resource-bar":
			document.getElementById(id).innerHTML += target.resourceCash_Pnl;
			document.getElementById(id).innerHTML += target.resourceBits_Pnl;
			document.getElementById(id).innerHTML += target.resourceWatts_Pnl;
			
			break;
	}
}