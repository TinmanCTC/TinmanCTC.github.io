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
	addButton(INTERFACE_DEFS[0], "view-buttons", 0);
	
	// Initialize production buttons
	addButton(INTERFACE_DEFS[1], "production-buttons", "punchcard");
	
	// Initialize broker buttons
	addButton(INTERFACE_DEFS[2], "broker-buttons", 0);
	
	// Initialize Resource Displays
	addDisplay(INTERFACE_DEFS[3], "resource-bar", 0);
	
}

export function addButton(source, type, target) {
	let retVal = 0;
	
	switch (type) {
		case "view-buttons":
			document.getElementById(type).innerHTML += source.Production_Btn;
			document.getElementById(type).innerHTML += source.Research_Btn;
			document.getElementById(type).innerHTML += source.Upgrades_Btn;
			document.getElementById(type).innerHTML += source.Managers_Btn;
			document.getElementById(type).innerHTML += source.Settings_Btn;
			
			retVal = 1;
			break;
		case "production-buttons":
			if (target == "punchcard") {
				document.getElementById(type).innerHTML += source.Punchcard_Btn;
			}
			
			if (target == "desktop" && buildingInstances[1].unlock.btn == false) {
				buildingInstances[1].unlock.btn == true;
				document.getElementById(type).innerHTML += source.Desktop_Btn;
			}
			
			retVal = 2;
			break;
		case "broker-buttons":
			
			if (target == "mother") {
				document.getElementById(type).innerHTML += source.brokerMother_Btn;
			}
			
			retVal = 3;
			break;
		default:
			retVal = -1;
	}
	
	return retVal;
}

export function addDisplay(source, type, target) {
	let retVal = 0;
	
	switch (type) {
		case "resource-bar":
			document.getElementById(type).innerHTML += source.resourceCash_Pnl;
			document.getElementById(type).innerHTML += source.resourceBits_Pnl;
			document.getElementById(type).innerHTML += source.resourceWatts_Pnl;
			
			break;
		case "building-list":
			if (target == "punchcard") {
				document.getElementById(type).innerHTML += source.storePunchcard_Pnl;
				document.getElementById("store-pnchcrd-lbl").innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>";
				document.getElementById("store-pnchcrd-qty").innerHTML = buildingInstances[0].quantity;
			}
			
			if (target == "desktop"  && buildingInstances[1].unlock.disp == false) {
				buildingInstances[1].unlock.disp == true;
				document.getElementById(type).innerHTML += source.storeDesktop_Pnl;
				document.getElementById("store-dsktp-lbl").innerHTML = "<b><u>Desktop Computer:&emsp;</b></u>";
				document.getElementById("store-dsktp-qty").innerHTML = buildingInstances[1].quantity;
			}
			
			break;
	}
}