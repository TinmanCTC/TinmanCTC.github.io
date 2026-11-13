---
permalink: /DM_IG/Javascript/Interface/UI.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Interface/UI.js
 * Use components.js for large UI elements with complicated code or fancy bits
 * Use UpgradePanels style element addition for all others
 * 
 */
 
import { emitEvent, onEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
import { gameState, checkUnlocks } from "/DM_IG/Javascript/Engine/stateManager.js";
import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { BROKERS_ID } from "/DM_IG/Javascript/Data/Brokers.js";
import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { BLDG_IDS, BLDG_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { INTERFACE_DEFS, INTERFACE_ID } from "/DM_IG/Javascript/Interface/Components.js";
import { initBldgUpgrPnl, createBldgUpgrPnl, createBldgUpgrRow, addBldgUpgrPnl } from "/DM_IG/Javascript/Interface/UpgradePanels.js";
import { UPGR_DEFS } from "/DM_IG/Javascript/Data/Upgrades.js";
import { resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";

/******** DOM Manipulators and Helper Functions
*
*
*
*
*/

/*	FUNCTION addComponent (string targetID, DOM component)
*	Accepts: 	element id of target DOM element
* 				source code of element(s) to add to target element
* 
* 	Returns: -1 on failure, 1 on success
*
*	Dependencies: None
*
*/
export function addComponent(targetID, component) {
	const tmp = document.createElement("div");
	
	tmp.innerHTML = component.trim();
	
	// Check if source component was initialized
	if (tmp.innerHTML == null) {
			return -1;					// Failure
	}
	
	document.getElementById(targetID).appendChild(tmp.firstElementChild);
	
	return 1;							// Success
}

function addBrokerButton(brkr) {
	let retVal = -1;
	let brkrBtn = null;
	
	
	switch (brkr) {
		case BROKERS_ID.MOTHER: 
			addComponent("broker-buttons", INTERFACE_DEFS[INTERFACE_ID.BROKER_BUTTONS].brokerMother_Btn);
			
			brkrBtn = document.getElementById(brokerInstances[BROKERS_ID.MOTHER].ui.elementID);
			
			brkrBtn.addEventListener("click", function() {
				brokerManager.sellBits(BROKERS_ID.MOTHER);
			});
			
			retVal = brkr;
			break;
		case BROKERS_ID.CRYPTO:
		
			break;
		case BROKERS_ID.SANDMAN:
		
			break;
		case BROKERS_ID.WENDY:
			
			break;
		default:
			retval = -2;
	}
	
	return retVal;
}

function addProductionButton(bldg) {
	let retVal = -1;
	let buttonID = null;
	
	
	switch (bldg) {
		case BLDG_IDS.PUNCHCARD:
			addComponent("production-buttons", INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Punchcard_Btn);
			
			buttonID = document.getElementById(buildingInstances[BLDG_IDS.PUNCHCARD].ui.elementID);
			
			buttonID.addEventListener("click", function () {
				buildingManager.clickBuilding(BLDG_IDS.PUNCHCARD);
			});
			
			retVal = bldg;
			break;
		case BLDG_IDS.DESKTOP:
			addComponent("production-buttons", INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].Desktop_Btn);
			
			buttonID = document.getElementById(buildingInstances[BLDG_IDS.DESKTOP].ui.elementID);
			
			buttonID.addEventListener("click", function () {
				buildingManager.clickBuilding(BLDG_IDS.DESKTOP);
			});
			
			retVal = bldg;
			break;
		case BLDG_IDS.CHEAP_GEN:
			addComponent("production-buttons", INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].CheapGen_Btn);
			
			buttonID = document.getElementById(buildingInstances[BLDG_IDS.CHEAP_GEN].ui.elementID);
			
			buttonID.addEventListener("click", function () {
				buildingManager.clickBuilding(BLDG_IDS.CHEAP_GEN);
			});
			
			retVal = bldg;
			break;
		case BLDG_IDS.LAN:
			addComponent("production-buttons", INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].LanServer_Btn);
			
			buttonID = document.getElementById(buildingInstances[BLDG_IDS.LAN].ui.elementID);
			
			buttonID.addEventListener("click", function () {
				buildingManager.clickBuilding(BLDG_IDS.LAN);
			});
			
			retVal = bldg;
			break;
		case BLDG_IDS.CLOUD:
			addComponent("production-buttons", INTERFACE_DEFS[INTERFACE_ID.PRODUCTION_BUTTONS].CloudServer_Btn);
			
			buttonID = document.getElementById(buildingInstances[BLDG_IDS.CLOUD].ui.elementID);
			
			buttonID.addEventListener("click", function () {
				buildingManager.clickBuilding(BLDG_IDS.CLOUD);
			});
			
			retVal = bldg;
			break;
		default:
			retval = -2;
	}
	
	console.log("addProductionButton() return: " + retVal);
	return retVal;
}

function addStoreRow(bldg) {
	const row = createStoreRow(bldg);
	
	// add event listener once and only once if bldg = 0 (first building unlock)
	if (bldg == BLDG_IDS.PUNCHCARD) {
		document.getElementById("building-list").addEventListener("click",
			e => {
				let retVal = -1;
				
				if (e.target.matches(".bldg-shop-btn")) {
					if (e.target.dataset.op == "Buy") {
						buildingManager.buyBuilding(e.target.dataset.bldgID, e.target.dataset.amt);
						retVal = 1;
					}
					
					if (e.target.dataset.op == "Sell" ) {
						buildingManager.sellBuilding(e.target.dataset.bldgID, e.target.dataset.amt);
						retVal = 2;
					}
				}
				
				console.log("Store Button Click Listener retVal: " + retVal);
				return retVal;
			});
	}
	
	document.getElementById("building-list").appendChild(row);
}

function createStoreRow(bldg) {
	const bldgCost = buildingManager.getBuyCost(bldg);
	
	const row = document.createElement("div");
	row.classList.add("store-display");
	row.id = buildingInstances[bldg].ui.shopID;
	
	const labelSpan = document.createElement("span");
	labelSpan.id = buildingInstances[bldg].ui.shopPnlID;
	labelSpan.textContent = buildingInstances[bldg].ui.shopDescriptor;
	
	const costSpan = document.createElement("span");
	costSpan.id = buildingInstances[bldg].ui.costPnlID;
	costSpan.textContent = "$" + bldgCost.toFixed(2) + "]: ";
	
	const qtySpan = document.createElement("span");
	qtySpan.id = buildingInstances[bldg].ui.qtyPnlID;
	qtySpan.textContent = buildingInstances[bldg].quantity;
	
	const buyBtn = document.createElement("button");
	const sellBtn = document.createElement("button");
	
	buyBtn.classList.add("bldg-shop-btn");
	buyBtn.id = buildingInstances[bldg].ui.buyBtnID;
	buyBtn.textContent = "Buy";
	buyBtn.dataset.bldgID = bldg;
	buyBtn.dataset.op = "Buy";
	buyBtn.dataset.amt = 1;
	
	sellBtn.classList.add("bldg-shop-btn");
	sellBtn.id = buildingInstances[bldg].ui.sellBtnID;
	sellBtn.textContent = "Sell";
	sellBtn.dataset.bldgID = bldg;
	sellBtn.dataset.op = "Sell";
	sellBtn.dataset.amt = 1;
	
	row.appendChild(labelSpan);
	row.appendChild(costSpan);
	row.appendChild(qtySpan);
	row.appendChild(buyBtn);
	row.appendChild(sellBtn);
	
	return row;
}

function addStoreButtons(bldg) {
	let retVal = -1;
	let storeBuyBtn = document.getElementById(buildingInstances[bldg].ui.buyBtnID);
	let storeSellBtn = document.getElementById(buildingInstances[bldg].ui.sellBtnID);
	let storePnlLbl = document.getElementById(buildingInstances[bldg].ui.shopPnlID);
	let storePnlQty = document.getElementById(buildingInstances[bldg].ui.qtyPnlID);
	let cstPnl = document.getElementById(buildingInstances[bldg].ui.costPnlID)
	
	storePnlLbl.innerHTML = buildingInstances[bldg].ui.shopDescriptor;
	storePnlQty.innerHTML = buildingInstances[bldg].quantity;	
	cstPnl.innerHTML = "$" + (buildingManager.getBuyCost(bldg)).toFixed(2) + "]: ";
	
	storeBuyBtn.dataset.bldgID = bldg;
	storeBuyBtn.dataset.op = "Buy";
	storeBuyBtn.dataset.amt = 1;
	storeSellBtn.dataset.bldgID = bldg;
	storeSellBtn.dataset.op = "Sell";
	storeSellBtn.dataset.amt = 1;
	
	// Initialize event listener for all store buttons once on initial building unlock
	if (bldg == BLDG_IDS.PUNCHCARD) {
		document.getElementById("building-list").addEventListener("click",
		e => {
			
		});
		
		
	}
	retVal = bldg;
	
	
	return retVal;
}

function addStoreText(bldg) {
	const storeLbl = document.getElementById(buildingInstances[bldg].ui.shopPnlID);
	const storeQty = document.getElementById(buildingInstances[bldg].ui.qtyPnlID);
	
	storeLbl.innerHTML = buildingInstances[bldg].ui.shopDescriptor;
	storeQty.innerHTML = buildingInstances[bldg].quantity;
}

function addViewButtons() {
	let retVal = -1;
	
	// Add DOM elements from templates
	addComponent("view-buttons", INTERFACE_DEFS[INTERFACE_ID.VIEW_BUTTONS].Production_Btn);
	addComponent("view-buttons", INTERFACE_DEFS[INTERFACE_ID.VIEW_BUTTONS].Research_Btn);
	addComponent("view-buttons", INTERFACE_DEFS[INTERFACE_ID.VIEW_BUTTONS].Upgrades_Btn);
	addComponent("view-buttons", INTERFACE_DEFS[INTERFACE_ID.VIEW_BUTTONS].Managers_Btn);
	addComponent("view-buttons", INTERFACE_DEFS[INTERFACE_ID.VIEW_BUTTONS].Settings_Btn);
	
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
	
	return retVal;
}

function addResourceDisplays() {
	let retVal = -1;
	
	addComponent("resource-bar", INTERFACE_DEFS[INTERFACE_ID.RESOURCE_DISP].resourceCash_Pnl);
	addComponent("resource-bar", INTERFACE_DEFS[INTERFACE_ID.RESOURCE_DISP].resourceBits_Pnl);
	addComponent("resource-bar", INTERFACE_DEFS[INTERFACE_ID.RESOURCE_DISP].resourceWatts_Pnl);
	
	retVal = 1;
	console.log("addResourceDisplays return: " + retVal);
	return retVal;
}

// Adds production building shop panels, text, and flavor text
function addProductionDisplay(bldg) {
	let retVal = -1;
	
	switch (bldg) {
		case BLDG_IDS.PUNCHCARD:
			addComponent("building-list", INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].Punchcard_Pnl);
			
			retVal = bldg;
			break;
		case BLDG_IDS.DESKTOP:
			addComponent("building-list", INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].Desktop_Pnl);
			
			retVal = bldg;
			break;
		case BLDG_IDS.CHEAP_GEN:
			addComponent("building-list", INTERFACE_DEFS[INTERFACE_ID.STORE_DISP].CheapGen_Pnl);
			
			retVal = bldg;
			break;
		case BLDG_IDS.LAN:
		
			retVal = bldg;
			break;
		case BLDG_IDS.CLOUD:
			
			retVal = bldg;
			break;
		default:
			retVal = -2;
	}
	
	//addStoreText(bldg);
	document.getElementById(buildingInstances[bldg].ui.descID).innerHTML = buildingInstances[bldg].description;
	
	return retVal;
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
	onEvent("buildingPurchased", updateBldgShopDisplay);
	onEvent("buildingUpgraded", updateBldgUpgrDisplay);
	onEvent("error", showError);
}

function updateMoneyDisplay(data) {
	const pnl = document.getElementById("Resource_Cash"); 
	pnl.innerHTML = "$" + data.current.toFixed(2);
	
	
	checkUnlocks();	// UPDATE THIS
}

function updateBitsDisplay(data) {
	const pnl = document.getElementById("Resource_Bits"); 
	
	pnl.innerHTML = data.current;
}

function updateWattsDisplay(data) {
	const pnl = document.getElementById("Resource_Watts");
	
	pnl.innerHTML = data.current;
	checkUnlocks();
}

function updateBldgShopDisplay(data) {
    let qtyPnl = document.getElementById(buildingInstances[data.buildingId].ui.qtyPnlID);
	let cstPnl = document.getElementById(buildingInstances[data.buildingId].ui.costPnlID);
	
    qtyPnl.innerHTML = data.quantity;
	cstPnl.innerHTML = "$" + data.cost.toFixed(2) + "]: ";
}

function updateBldgUpgrDisplay(data) {
	const lvlPnl = document.getElementById(data.buildingUpgr.lvlID);
	const costPnl = document.getElementById(data.buildingUpgr.costID);
	
	lvlPnl.innerHTML = "Lvl: " + data.buildingUpgr.level;
	costPnl.innerHTML = "$" + data.buildingUpgr.cost.toFixed(2);
	
	if (data.buildingUpgr.type == "cost") {
		upgradeBldgShopDisplay({ 
			buildingId: data.buildingId, 
			quantity: buildingInstances[data.buildingId].quantity,
			cost: buildingInstances[data.buildingId].cost
		});
	}
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
					cstPnl.innerHTML = "$" + buildingManager.getBuyCost(data.ID).toFixed(2) + "]:";
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
					cstPnl.innerHTML = "$" + buildingManager.getBuyCost(data.ID).toFixed(2) + "]:";
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
			addProductionButton(data.buildingId);
			//addProductionDisplay(data.buildingId);
			addStoreRow(data.buildingId);
			//addStoreButtons(data.buildingId);
			
			break;
		case BLDG_IDS.DESKTOP:
			addProductionButton(data.buildingId);
			addProductionDisplay(data.buildingId);
			addStoreRow(data.buildingId);
			//addStoreButtons(data.buildingId);
			
			addBldgUpgrPnl(buildingInstances[BLDG_IDS.DESKTOP]);
			
			break;
		case BLDG_IDS.CHEAP_GEN:
			addProductionButton(data.buildingId);
			addProductionDisplay(data.buildingId);
			addStoreRow(data.buildingId);
			//addStoreButtons(data.buildingId);
			
			addBldgUpgrPnl(buildingInstances[BLDG_IDS.CHEAP_GEN]);
						
			break;
		default:
			console.log("unlockBuilding() switch(data.buildingId) default case");
	}	
}

function checkMoneyUnlocks(data) {
	
}


export function initUI() {
	addViewButtons();
	addResourceDisplays();
	addBrokerButton(BROKERS_ID.MOTHER);
	initBldgUpgrPnl();
	
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