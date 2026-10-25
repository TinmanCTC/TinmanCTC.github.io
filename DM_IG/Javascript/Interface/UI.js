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
 
import { pushEvent, onEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { BUILDING_ID, BUILDING_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { INTERFACE_DEFS, INTERFACE_ID } from "/DM_IG/Javascript/Interface/Components.js";

function assignListeners() {
	onEvent("moneyChanged", updateMoneyDisplay);
	onEvent("bitsChanged", updateBitsDisplay);
	onEvent("buildingPurchased", updateBuildingDisplay);
	//onEvent("error", showError);
}

function updateMoneyDisplay(data) {
	const pnl = document.getElementById("Resource_Cash"); 
	
	pnl.innerHTML = "$" + data.current.toFixed(2);
}

function updateBitsDisplay(data) {
	const pnl = document.getElementById("Resource_Bits"); 
	
	pnl.innerHTML = "$" + data.current;
}

function updateBuildingDisplay(data) {

    const pnl = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);

    pnl.innerHTML = data.quantity;

}


export function initUI() {
	// Initialize view buttons
	addButton(INTERFACE_DEFS[0], "view-buttons", 0);
	
	// Initialize production buttons
	addButton(INTERFACE_DEFS[1], "production-buttons", "Punchcard");
	
	// Initialize broker buttons
	addButton(INTERFACE_DEFS[2], "broker-buttons", "Mother");
	
	// Initialize Resource Displays
	addDisplay(INTERFACE_DEFS[3], "resource-bar", 0);
	
	// Initialize Store Display
	addDisplay(INTERFACE_DEFS[4], "building-list", "Punchcard");
	
	assignListeners();
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
			if (target == "Punchcard") {
				document.getElementById(type).innerHTML += source.Punchcard_Btn;
			}
			
			if (target == "Desktop" && buildingInstances[1].unlock.btn == false) {
				buildingInstances[1].unlock.btn == true;
				document.getElementById(type).innerHTML += source.Desktop_Btn;
			}
			
			retVal = 2;
			break;
		case "broker-buttons":
			if (target == "Mother") {
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
			if (target == 0) {
				document.getElementById(type).innerHTML += source.resourceCash_Pnl;
				document.getElementById(type).innerHTML += source.resourceBits_Pnl;
				document.getElementById(type).innerHTML += source.resourceWatts_Pnl;
			}
			
			if (target == "qBits") { }
			
			break;
		case "building-list":
			if (target == "Punchcard") {
				document.getElementById(type).innerHTML += source.storePunchcard_Pnl;
				document.getElementById("store-pnchcrd-lbl").innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>";
				document.getElementById("store-pnchcrd-qty").innerHTML = buildingInstances[0].quantity;
			}
			
			if (target == "desktop"  && buildingInstances[1].unlock.disp == false) {
				buildingInstances[1].unlock.disp == true;
				document.getElementById(type).innerHTML += source.storeDesktop_Pnl;
				document.getElementById("store-dsktp-lbl").innerHTML = "<b><u>Desktop Computer:&emsp;</b></u>";
				document.getElementById("store-dsktp-qty").innerHTML = buildingInstances[1].quantity;
				
				var storeBuyBtn = document.getElementById(buildingInstances[1].ui.buyBtnID);
				var storeSellBtn = document.getElementById(buildingInstances[1].ui.sellBtnID);
				var storeQtyPnl = document.getElementById(buildingInstances[1].ui.qtyPnlID);
				
				storeBuyBtn.addEventListener("click", function() {
					buildingManager.buyBuilding(1,1);
					pushEvent("qtyChange", storeQtyPnl, storeBuyBtn);		
				});
				
				storeSellBtn.addEventListener("click", function() {
					buildingManager.sellBuilding(1,1);
					pushEvent("qtyChange", storeQtyPnl, storeSellBtn);		
				});
				
				storeQtyPnl.addEventListener("qtyChange", function() {
					storeQtyPnl.innerHTML = buildingInstances[1].quantity;
				});
				
			}
			
			break;
	}
}