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
 
import { emitEvent, onEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
import { gameState, checkUnlocks } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { BLDG_IDS, BLDG_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { INTERFACE_DEFS, INTERFACE_ID } from "/DM_IG/Javascript/Interface/Components.js";

/******** DOM Manipulators and Helper Functions
*
*
*
*
*/

function addComponent(targetID, component) {
	const tmp = document.createElement("div");
	
	tmp.innerHTML = component.trim();
	
	// Check if source component was initialized
	if (tmp.innerHTML == null) {
			return -1;					// Failure
	}
	
	document.getElementById(targetID).appendChild(tmp.firstElementChild);
	
	return 1;							// Success
}

export function addButton(source, type, target) {
	let retVal = 0;
	
	switch (type) {
		case "view-buttons":
			addComponent(type, source.Production_Btn);
			addComponent(type, source.Research_Btn);
			addComponent(type, source.Upgrades_Btn);
			addComponent(type, source.Managers_Btn);
			addComponent(type, source.Settings_Btn);
						
			retVal = 1;
			break;
		case "production-buttons":
			if (target == "Punchcard") {
				addComponent(type, source.Punchcard_Btn);				
			}
			
			if (target == "Desktop" && buildingInstances[1].unlock.btn == false) {
				buildingInstances[BLDG_IDS.PUNCHCARD].unlock.btn = true;
				addComponent(type, source.Desktop_Btn);
			}
			
			retVal = 2;
			break;
		case "broker-buttons":
			if (target == "Mother") {
				addComponent(type, source.brokerMother_Btn);
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
			// Default case
			if (target == 0) {
				addComponent(type, source.resourceCash_Pnl);
				addComponent(type, source.resourceBits_Pnl);
				addComponent(type, source.resourceWatts_Pnl);
			}
			
			// Late game unlock
			if (target == "qBits") { }
			
			break;
		case "building-list":
			if (target == "Punchcard") {
				addComponent(type, source.storePunchcard_Pnl);
				
				document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.shopPnlID).innerHTML = buildingInstances[BLDG_IDS.PUNCHCARD].ui.shopDescriptor;
				document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.qtyPnlID).innerHTML = buildingInstances[BLDG_IDS.PUNCHCARD].quantity;
				
				const storeBuyBtn = document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.buyBtnID);
				const storeSellBtn = document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.sellBtnID);
				
				storeBuyBtn.addEventListener("click", function() {
					buildingManager.buyBuilding(BLDG_IDS.PUNCHCARD,1);
				});
				
				storeSellBtn.addEventListener("click", function() {
					buildingManager.sellBuilding(BLDG_IDS.PUNCHCARD,1);
				});
			}
			
			if (target == "desktop"  && buildingInstances[BLDG_IDS.DESKTOP].unlock.disp == false) {
				buildingInstances[BLDG_IDS.DESKTOP].unlock.disp = true;
				addComponent(type, source.storeDesktop_Pnl);
				
				document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.shopPnlID).innerHTML = buildingInstances[BLDG_IDS.DESKTOP].ui.shopDescriptor;
				document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.qtyPnlID).innerHTML = buildingInstances[BLDG_IDS.DESKTOP].quantity;
				
				const storeBuyBtn = document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.buyBtnID);
				const storeSellBtn = document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.sellBtnID);
				
				storeBuyBtn.addEventListener("click", function() {
					buildingManager.buyBuilding(BLDG_IDS.DESKTOP,1);		
				});
				
				storeSellBtn.addEventListener("click", function() {
					buildingManager.sellBuilding(BLDG_IDS.DESKTOP,1);	
				});
				
			}
			
			break;
	}
}

/******** UI Listeners and Event Handlers
*
*
*
*
*/


function assignListeners() {
	onEvent("moneyChanged", updateMoneyDisplay);
	onEvent("moneyChanged", checkMoneyUnlocks);
	onEvent("bitsChanged", updateBitsDisplay);
	onEvent("wattsChanged", updateWattsDisplay);
	onEvent("buildingUnlocked", unlockBuilding);
	onEvent("buildingPurchased", updateBuildingDisplay);
	onEvent("error", showError);
}

function updateMoneyDisplay(data) {
	const pnl = document.getElementById("Resource_Cash"); 
	pnl.innerHTML = "$" + data.current.toFixed(2);
	//checkUnlocks();
}

function updateBitsDisplay(data) {
	const pnl = document.getElementById("Resource_Bits"); 
	
	pnl.innerHTML = data.current;
}

function updateWattsDisplay(data) {
	const pnl = document.getElementById("Resource_Watts");
	
	pnl.innerHTML = data.current;
}

function updateBuildingDisplay(data) {

    const pnl = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);

    pnl.innerHTML = data.quantity;

}

function showError(data) {
	const pnl = document.getElementById(data.target);
	
	pnl.innerHTML = data.message;
	
	setTimeout(function() { pnl.innerHTML = data.resetContent; }, 1500);
}

function unlockBuilding(data) {
	const shopPnl = document.getElementById("building-list");
	const prodPnl = document.getElementById("production-buttons");	
	
	switch (data.buildingId) {
		case BLDG_IDS.PUNCHCARD:
			addComponent(prodPnl, INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Punchcard_Btn);
			addComponent(shopPnl, INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].storePunchcard_Pnl);
			
			break;
		case BLDG_IDS.DESKTOP:
			addComponent(prodPnl, INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Desktop_Btn);
			addComponent(shopPnl, INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].storeDesktop_Pnl);			
			
			break;
		default:
			console.log("unlockBuilding() switch(data.buildingId) default case");
	}
	
	const shopPnlLbl = document.getElementById(buildingInstances[data.buildingId].ui.shopPnlID);
	const shopPnlQty = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);
	const shopBuyBtn = document.getElementById(buildingInstances[data.buildingId].ui.buyBtnID);
	const shopSellBtn = document.getElementById(buildingInstances[data.buildingId].ui.sellBtnID);
	
	const prodBtn = document.getElementById(buildingInstances[data.buildingId].ui.elementID);
	
	shopPnlLbl.innerHTML = buildingInstances[data.buildingId].ui.shopDescriptor;
	shopPnlQty.innerHTML = buildingInstances[data.buildingId].quantity;	
}

function checkMoneyUnlocks(data) {
	
}


export function initUI() {
	// Initialize view buttons
	addButton(INTERFACE_DEFS[0], "view-buttons", 0);
	
	// Initialize broker buttons
	addButton(INTERFACE_DEFS[2], "broker-buttons", "Mother");
	
	// Initialize Resource Displays
	addDisplay(INTERFACE_DEFS[3], "resource-bar", 0);
	
	// Initialize UI listeners and Event Handlers
	assignListeners();
	
	// Wake up default resources and production buildings
	emitEvent("buildingUnlocked", {
		buildingId: BLDG_IDS.PUNCHCARD
	});
	emitEvent("moneyChanged", {
		current: gameState.money,
		delta: 0
	});
	emitEvent("bitsChanged", {
		current: gameState.bits,
		delta: 0
	});
}