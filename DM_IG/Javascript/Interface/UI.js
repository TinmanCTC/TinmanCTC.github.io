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
	
}

export function addButton(target, id) {
	let retVal = 0;
	
	switch (id) {
		case "view-buttons":
			document.getElementById(id).innerHTML += target.Production_Button;
			document.getElementById(id).innerHTML += target.Research_Button;
			document.getElementById(id).innerHTML += target.Upgrades_Button;
			document.getElementById(id).innerHTML += target.Managers_Button;
			document.getElementById(id).innerHTML += target.Settings_Button;
			
			retVal = 1;
			break;
		case "production-buttons":
			document.getElementById(id).innerHTML += target.Punchcard_Button;
			
			// Check if other buildings are unlocked and populate them if so
			
			
			retVal = 2;
			break;
		case "broker-buttons":
			document.getElementById(id).innerHTML += target.brokerMother_Button;
			
			retVal = 3;
			break;
		default:
			retVal = -1;
	}
	
	return retVal;
}