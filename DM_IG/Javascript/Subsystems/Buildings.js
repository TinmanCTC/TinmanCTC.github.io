---
permalink: /DM_IG/Javascript/Subsystems/Buildings.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Subsystems/Buildings.js
 * Contains object information for production buildings
 * 
 */

import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { eventFeed } from "/DM_IG/Javascript/Engine/eventManager.js";

import { BUILDING_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";
import { addDisplay } from "/DM_IG/Javascript/Interface/UI.js";
import { INTERFACE_DEFS } from "/DM_IG/Javascript/Interface/Components.js";

export const buildingInstances = [];

export class BuildingManager {
	constructor() {
		this.buildings = [];
	}
	
	// Adds a new instance of bldg to buildingInstances utilizing BUILDING_DEFS
	addBuilding(bldg) {
		this.buildings.push(bldg);
		let loc = (this.buildings.length - 1);
		let newBldg = {
				id: this.buildings[loc].id,
				name: this.buildings[loc].name,
				level: 1,
				resource: this.buildings[loc].resource,
				description: this.buildings[loc].description,
				quantity: 1,
				upgrades: [],
				cost: this.buildings[loc].cost,
				production: this.buildings[loc].production,
				manager: this.buildings[loc].manager,
				unlock: this.buildings[loc].unlock,
				prestige: this.buildings[loc].prestige,
				ui: this.buildings[loc].ui,
				tags: this.buildings[loc].tags,
				isClicked: false,
				timeClicked: 0,
				mngrTimeClicked: 0
		};
		buildingInstances.push(newBldg);
		gameState.bldgs.push(newBldg);
	}
	
	// Creates a new building definition and adds it to BUILDING_DEFS
	createBuilding(bldg) {
		BUILDING_DEFS.push(bldg);
	}
	
	clickBuilding(id) {
		console.log("Entering clickBuilding...");
		var amt = this.getOutput(id);
		var cooldown = this.getClickInterval(id);
		
		this.disableBuilding(id);
		setTimeout(() => this.enableBuilding(id), cooldown);
		
		resourceManager.addBits(amt);
	}

	getOutput(id) {		
		var retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + buildingInstances[id].production.bonus);	
		
		return retVal;
	}
	
	getClickInterval(id) {		
		var retVal =  buildingInstances[id].production.clickInterval;
		var power = resourceManager.getPowerGen() - resourceManager.getPowerCon();
		
		if (power >= 0) {
			return retVal;
		} else {
			return (retVal * 2);
		}
	}
	
	getBuyCost(id) {
		var retVal = buildingInstances[id].cost.base + (buildingInstances[id].quantity * buildingInstances[id].cost.growthRate);
		
		return retVal;
	}
	
	enableBuilding(id) {
		buildingInstances[id].isClicked = false;
		document.getElementById(buildingInstances[id].ui.elementID).disabled = false;
	}
	
	disableBuilding(id) {
		buildingInstances[id].isClicked = true;
		document.getElementById(buildingInstances[id].ui.elementID).disabled = true;
	}
	
	buyBuilding(id, amt) {
		
		if (gameState.money >= (buildingInstances[id].cost.base * amt)) {
			buildingInstances[id].quantity += amt;
			resourceManager.addPowerCon(buildingInstances[id].production.powerUse);
			resourceManager.subMoney(buildingInstances[id].cost.base * amt);
		} else {
			// -FIX THIS
			var alertPnl = document.getElementById("store-pnchcrd-lbl");
			
			alertPnl.innerHTML = "<b style='color:#FF0000;'><u>Not Enough Money!&emsp;</b></u>";
			
			setTimeout(function() { alertPnl.innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>"; }, 1000);
			// -FIX THIS
		}
		
	}
	
	sellBuilding(id, amt) {
		if (buildingInstances[id].quantity - amt >= 0) {
			buildingInstances[id].quantity -= amt;
			resourceManager.subPowerCon(buildingInstances[id].production.powerUse);
			resourceManager.addMoney(buildingInstances[id].cost.base * amt);
		} else {
			// -FIX THIS
			var alertPnl = document.getElementById("store-pnchcrd-lbl");
			
			alertPnl.innerHTML = "<b style='color:#FF0000;'><u>Not Enough Buildings!&emsp;</b></u>";
			
			setTimeout(function() { alertPnl.innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>"; }, 1000);
			// -FIX THIS
		}
	}
	
}

export const buildingManager = new BuildingManager();

export function initBuildings() {
	// Create Punchcard & Desktop instances by default
	buildingManager.addBuilding(BUILDING_DEFS[0]);
	buildingManager.addBuilding(BUILDING_DEFS[1]);
 };