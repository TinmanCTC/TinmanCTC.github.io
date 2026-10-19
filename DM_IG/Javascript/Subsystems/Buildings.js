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
	}
	
	// Creates a new building definition and adds it to BUILDING_DEFS
	createBuilding(bldg) {
		BUILDING_DEFS.push(bldg);
	}

	getOutput(id) {
		return buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + buildingInstances[id].production.bonus);
	}
	
	enableBuilding(id) {
		buildingInstances[id].isClicked = false;
		document.getElementById(buildingInstances[id].ui.elementID).disabled = false;
	}
	
	disableBuilding(id) {
		buildingInstances[id].isClicked = true;
		console.log(buildingInstances[id].ui.elementID);
		console.log(document.getElementById(buildingInstances[id].ui.elementID));
		document.getElementById(buildingInstances[id].ui.elementID).disabled = true;
	}
	
	buyBuilding(id, amt) {
		
		if (gameState.money <= (buildingInstances[id].cost * amt)) {
			buildingInstances[id].quantity += amt;
		} else {
			alert("Not enough money!");
		}
		
	}
	
	sellBuilding(id, amt) {
		
		if (buildingInstances[id].quantity - amt >= 0) {
			buildingInstances[id].quantity -= amt;
			
		} else {
			alert("Not enough buildings!");
		}
	}
	
}

export const buildingManager = new BuildingManager();

export function initBuildings() {
	
	console.log("Initializing buildings...");
	
	buildingManager.addBuilding(BUILDING_DEFS[0]);
	
	console.log(buildingInstances[0]);
	
 };