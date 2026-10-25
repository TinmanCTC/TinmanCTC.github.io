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
import { eventFeed, emitEvent } from "/DM_IG/Javascript/Engine/eventManager.js";

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
		console.log(this.buildings.length);
		this.buildings.push(bldg);
		console.log(this.buildings.length);
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
		const amt = this.getOutput(id);
		const cooldown = this.getClickInterval(id);
		
		this.disableBuilding(id);
		setTimeout(() => this.enableBuilding(id), cooldown);
		
		resourceManager.addBits(amt);
		//emitEvent("buildingClicked", data => { stats.totalClicks++ });
	}

	getOutput(id) {		
		const retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + buildingInstances[id].production.bonus);	
		
		return retVal;
	}
	
	getClickInterval(id) {		
		const retVal =  buildingInstances[id].production.clickInterval;
		const power = resourceManager.getPowerGen() - resourceManager.getPowerCon();
		
		if (power >= 0) {
			return retVal;
		} else {
			return (retVal * 2);
		}
	}
	
	getBuyCost(id) {
		const retVal = buildingInstances[id].cost.base + (buildingInstances[id].quantity * buildingInstances[id].cost.growthRate);
		
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
		const cost = buildingInstances[id].cost.base * amt;
		const powerCon = buildingInstances[id].production.powerUse * amt;
		
		if (gameState.money < cost) {
			emitEvent("error", { message: "Not enough money!" });
			
			return false;
		}
		
		buildingInstances[id].quantity += amt;
		resourceManager.subMoney(cost);
		resourceManager.addPowerCon(powerCon);
		
		emitEvent("buildingPurchased", {
			buildingId: id,
			quantity: buildingInstances[id].quantity,
			cost
		});
		
		return true;
		
		/*if (gameState.money >= (buildingInstances[id].cost.base * amt)) {
			buildingInstances[id].quantity += amt;
			resourceManager.addPowerCon(buildingInstances[id].production.powerUse);
			resourceManager.subMoney(buildingInstances[id].cost.base * amt);
		} else {
			// -FIX THIS
			var alertPnl = document.getElementById("store-pnchcrd-lbl");
			
			alertPnl.innerHTML = "<b style='color:#FF0000;'><u>Not Enough Money!&emsp;</b></u>";
			
			setTimeout(function() { alertPnl.innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>"; }, 1000);
			// -FIX THIS
		}*/
		
	}
	
	sellBuilding(id, amt) {
		const cost = buildingInstances[id].cost.base * amt;
		const powerCon = buildingInstances[id].production.powerUse * amt;
		
		if (buildingInstances[id].quantity < amt) {
			emitEvent("error", { message: "Not enough buildings!" });
			
			return false;
		}
		
		buildingInstances[id].quantity -= amt;
		resourceManager.addMoney(cost);
		resourceManager.subPowerCon(powerCon);
		
		emitEvent("buildingPurchased", {
			buildingId: id,
			quantity: buildingInstances[id].quantity,
			cost
		});
		
		return true;
		
		
		/*if (buildingInstances[id].quantity - amt >= 0) {
			buildingInstances[id].quantity -= amt;
			resourceManager.subPowerCon(buildingInstances[id].production.powerUse);
			resourceManager.addMoney(buildingInstances[id].cost.base * amt);
		} else {
			// -FIX THIS
			var alertPnl = document.getElementById("store-pnchcrd-lbl");
			
			alertPnl.innerHTML = "<b style='color:#FF0000;'><u>Not Enough Buildings!&emsp;</b></u>";
			
			setTimeout(function() { alertPnl.innerHTML = "<b><u>Punchcard Machine:&emsp;</b></u>"; }, 1000);
			// -FIX THIS
		}*/
	}
	
	
}

export const buildingManager = new BuildingManager();

export function initBuildings() {
	// Create Punchcard & Desktop instances by default
	buildingManager.addBuilding(BUILDING_DEFS[0]);
	buildingManager.addBuilding(BUILDING_DEFS[1]);
 };