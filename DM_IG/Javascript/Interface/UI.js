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
import { BUILDING_ID, BUILDING_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { INTERFACE_DEFS, INTERFACE_ID } from "/DM_IG/Javascript/Interface/Components.js";

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
	checkUnlocks();
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
	console.log(data);
	const shopPnl = document.getElementById("building-list");
	const prodPnl = document.getElementById("production-buttons");
	
	console.log(buildingInstances[data.buildingId]);
	//console.log(shopPnlQty);
	console.log(shopPnl);
	
	
	switch (data.buildingId) {
		case BUILDING_ID.PUNCHCARD:
			prodPnl.innerHTML += INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Punchcard_Btn;
			shopPnl.innerHTML += INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].storePunchcard_Pnl;
			
			
			break;
		case BUILDING_ID.DESKTOP:
			prodPnl.innerHTML += INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Desktop_Btn;
			shopPnl.innerHTML += INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].storeDesktop_Pnl;
			
			
			break;
		default:
			console.log("unlockBuilding() switch(data.buildingId) default case");
	}
	
	
	const shopPnlQty = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);
	const shopBuyBtn = document.getElementById(buildingInstances[data.buildingId].ui.buyBtnID);
	const shopSellBtn = document.getElementById(buildingInstances[data.buildingId].ui.sellBtnID);
	const prodBtn = document.getElementById(buildingInstances[data.buildingId].ui.elementId);
	
	document.getElementById(buildingInstances[data.buildingId].ui.shopPnlID).innerHTML = buildingInstances[data.buildingId].ui.shopDescriptor;
	
	shopPnlQty.innerHTML = buildingInstances[data.buildingId].quantity;
	
	shopBuyBtn.addEventListener("click", function() {
		buildingManager.buyBuilding(data.buildingId, 1);
	});
	
	shopSellBtn.addEventListener("click", function() {
		buildingManager.sellBuilding(data.buildingId, 1);
	});
	
	
}

function checkMoneyUnlocks(data) {
	
}


export function initUI() {
	// Initialize view buttons
	addButton(INTERFACE_DEFS[0], "view-buttons", 0);
	
	// Initialize production buttons
	
	// -REPLACING:
	//addButton(INTERFACE_DEFS[1], "production-buttons", "Punchcard");
	
	// Initialize broker buttons
	addButton(INTERFACE_DEFS[2], "broker-buttons", "Mother");
	
	// Initialize Resource Displays
	addDisplay(INTERFACE_DEFS[3], "resource-bar", 0);
	
	// Initialize Store Display
	
	// -REPLACING
	//addDisplay(INTERFACE_DEFS[4], "building-list", "Punchcard");
	
	assignListeners();
	emitEvent("buildingUnlocked", {
		buildingId: BUILDING_ID.PUNCHCARD
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
				document.getElementById("store-dsktp-lbl").innerHTML = buildingInstances[1].ui.shopDescriptor;
				document.getElementById("store-dsktp-qty").innerHTML = buildingInstances[1].quantity;
				
				const storeBuyBtn = document.getElementById(buildingInstances[1].ui.buyBtnID);
				const storeSellBtn = document.getElementById(buildingInstances[1].ui.sellBtnID);
				const storeQtyPnl = document.getElementById(buildingInstances[1].ui.qtyPnlID);
				
				storeBuyBtn.addEventListener("click", function() {
					buildingManager.buyBuilding(1,1);		
				});
				
				storeSellBtn.addEventListener("click", function() {
					buildingManager.sellBuilding(1,1);	
				});
				
			}
			
			break;
	}
}