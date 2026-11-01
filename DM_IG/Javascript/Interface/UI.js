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
import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { BROKERS_ID } from "/DM_IG/Javascript/Data/Brokers.js";
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
			// Add DOM elements from templates
			addComponent(type, source.Production_Btn);
			addComponent(type, source.Research_Btn);
			addComponent(type, source.Upgrades_Btn);
			addComponent(type, source.Managers_Btn);
			addComponent(type, source.Settings_Btn);
			
			// Assign onClick listeners to new buttons
			// View Toggle Buttons
			const settingsButtonID = document.getElementById("settings_button");
			const researchButtonID = document.getElementById("research_button");
			const productionButtonID = document.getElementById("production_button");
			const upgradesButtonID = document.getElementById("upgrades_button");
			const managersButtonID = document.getElementById("managers_button");
			
			productionButtonID.addEventListener("click", function () {
				changeView(gameState.currentView, "Production");
			});
			
			settingsButtonID.addEventListener("click", function () {
				changeView(gameState.currentView, "Settings");
			});
			
			researchButtonID.addEventListener("click", function () {
				changeView(gameState.currentView, "Research");
			});
			
			upgradesButtonID.addEventListener("click", function () {
				changeView(gameState.currentView, "Upgrades");
			});
			
			managersButtonID.addEventListener("click", function () {
				changeView(gameState.currentView, "Managers");
			});
						
			retVal = 1;
			break;
		case "production-buttons":
			if (target == "Punchcard") {
				addComponent(type, source.Punchcard_Btn);
				
				const punchcardButtonID = document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.elementID);
	
				// Punchcard building - on by default
				punchcardButtonID.addEventListener("click", function () {
					buildingManager.clickBuilding(BLDG_IDS.PUNCHCARD);
				});
			}
			
			if (target == "Desktop" && !buildingInstances[BLDG_IDS.DESKTOP].unlock.btn) {
				buildingInstances[BLDG_IDS.DESKTOP].unlock.btn = true;
				addComponent(type, source.Desktop_Btn);
				
				const desktopButtonID = document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.elementID);
				
				desktopButtonID.addEventListener("click", function () {
					buildingManager.clickBuilding(BLDG_IDS.DESKTOP);
				});
			}
			
			retVal = 2;
			break;
		case "broker-buttons":
			if (target == "Mother") {
				addComponent(type, source.brokerMother_Btn);
				
				const brokerMotherButtonID = document.getElementById(brokerInstances[BROKERS_ID.MOTHER].ui.elementID);
	
				// Mother Broker - on by default	
				brokerMotherButtonID.addEventListener("click", function() {
					brokerManager.sellBits(BROKERS_ID.MOTHER);
				});
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
			
			if (target == "Desktop"  && buildingInstances[BLDG_IDS.DESKTOP].unlock.disp == false) {
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

function changeView(currView, targetView) {
	const productionView = document.getElementById("view-production");
	const managersView = document.getElementById("view-managers");
	const upgradesView = document.getElementById("view-upgrades");
	const researchView = document.getElementById("view-research");
	const settingsView = document.getElementById("view-settings");
	
	// Do nothing if view button for current view is clicked
	if (currView == targetView) { return 0; }
	
	let currViewID = getViewID(currView);
	
	switch (targetView) {
		case "Production":
			gameState.currentView = targetView;			
			currViewID.style.display = "none";
			productionView.style.display = "flex";			
			break;
		case "Research":
			gameState.currentView = targetView;
			currViewID.style.display = "none";
			researchView.style.display = "flex";
			break;
		case "Upgrades": 
			gameState.currentView = targetView;
			currViewID.style.display = "none";
			upgradesView.style.display = "flex";
		
			break;
		case "Managers":
			gameState.currentView = targetView;
			currViewID.style.display = "none";
			managersView.style.display = "flex";
			break;
		case "Settings":
			gameState.currentView = targetView;
			currViewID.style.display = "none";
			settingsView.style.display = "flex";
			break;
		default:
			gameState.currentView = "Production";
			currViewID.style.display = "none";
			productionView.style.display = "flex";	
	}
}

function getViewID(view) {
	let retVal = -1;
	
	switch (view) {
		case "Production":
			retVal = document.getElementById("view-production");
			break;
		case "Upgrades":
			retVal = document.getElementById("view-upgrades");
			break;
		case "Managers":
			retVal = document.getElementById("view-managers");
			break;
		case "Research":
			retVal = document.getElementById("view-research");
			break;
		case "Settings":
			retVal = document.getElementById("view-settings");
			break;		
		default:
			retVal = document.getElementById("view-production");
	}
	
	return retVal;
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

    const qtyPnl = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);
	const cstPnl = document.getElementById(buildingInstances[data.buildingId].ui.costPnlID)

    qtyPnl.innerHTML = data.quantity;
	cstPnl.innerHTML = "$" + data.cost.toFixed(2) + "]:</b></u> ";

}

function showError(data) {
	let retVal = -1;
	
	switch (data.type) {
		case "shop":
			const qtyPnl = document.getElementById(buildingInstances[data.ID].ui.qtyPnlID);
			const cstPnl = document.getElementById(buildingInstances[data.ID].ui.costPnlID);
			const shopPnl = document.getElementById(buildingInstances[data.ID].ui.shopPnlID);
			
			if (data.buyOrSell == "buy") {
				cstPnl.innerHTML = "";
				qtyPnl.innerHTML = "";
				shopPnl.innerHTML = "Not enough money!";
				
				setTimeout(function () {
					shopPnl.innerHTML = buildingInstances[data.ID].ui.shopDescriptor;
					qtyPnl.innerHTML = buildingInstances[data.ID].quantity;
					cstPnl.innerHTML = "$" + buildingManager.getBuyCost(data.ID).toFixed(2) + "]:</b></u>";
				}, 1500);
				
				retVal = 1;
			}
			
			if (data.buyOrSell == "sell") {
				cstPnl.innerHTML = "";
				qtyPnl.innerHTML = "";
				shopPnl.innerHTML = "Not enough buildings!";
				
				setTimeout(function () {
					shopPnl.innerHTML = buildingInstances[data.ID].ui.shopDescriptor;
					qtyPnl.innerHTML = buildingInstances[data.ID].quantity;
					cstPnl.innerHTML = "$" + buildingManager.getBuyCost(data.ID).toFixed(2) + "]:</b></u>";
				}, 1500);
				
				retVal = 1;
			}
			break;
		default:
			
	}
	
	return retVal;
}

function unlockBuilding(data) {
	const shopPnl = document.getElementById("building-list");
	const prodPnl = document.getElementById("production-buttons");	
	
	switch (data.buildingId) {
		case BLDG_IDS.PUNCHCARD:
			addButton(INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS], "production-buttons", "Punchcard");
			addDisplay(INTERFACE_DEFS[INTERFACE_ID.STORE_DISP], "building-list", "Punchcard");
			
			break;
		case BLDG_IDS.DESKTOP:
			addButton(INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS], "production-buttons", "Desktop");
			addDisplay(INTERFACE_DEFS[INTERFACE_ID.STORE_DISP], "building-list", "Desktop");		
			
			break;
		default:
			console.log("unlockBuilding() switch(data.buildingId) default case");
	}
	
	const shopPnlLbl = document.getElementById(buildingInstances[data.buildingId].ui.shopPnlID);
	const shopPnlQty = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);
	const shopBuyBtn = document.getElementById(buildingInstances[data.buildingId].ui.buyBtnID);
	const cstPnl = document.getElementById(buildingInstances[data.buildingId].ui.costPnlID)
	const shopSellBtn = document.getElementById(buildingInstances[data.buildingId].ui.sellBtnID);
	
	const prodBtn = document.getElementById(buildingInstances[data.buildingId].ui.elementID);
	
	shopPnlLbl.innerHTML = buildingInstances[data.buildingId].ui.shopDescriptor;
	shopPnlQty.innerHTML = buildingInstances[data.buildingId].quantity;	
	cstPnl.innerHTML = "$" + buildingManager.getBuyCost(data.buildingId) + "]:</b></u> ";
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