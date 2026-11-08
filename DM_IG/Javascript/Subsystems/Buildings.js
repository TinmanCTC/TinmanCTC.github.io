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

import { BLDG_DEFS, BLDG_IDS } from "/DM_IG/Javascript/Data/Buildings.js";
import { resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";
import { addDisplay } from "/DM_IG/Javascript/Interface/UI.js";
import { INTERFACE_DEFS } from "/DM_IG/Javascript/Interface/Components.js";
import { bldgUpgrades } from "/DM_IG/Javascript/Data/Upgrades.js";

export const buildingInstances = [];

export class BuildingManager {
	constructor() {
		this.buildings = [];
	}
	
	// Adds a new instance of bldg to buildingInstances utilizing BLDG_DEFS
	addBuilding(bldg) {
		this.buildings.push(bldg);
		//console.log(this.buildings);
		let loc = (this.buildings.length - 1);
		let newBldg = {
				id: this.buildings[loc].id,
				name: this.buildings[loc].name,
				level: 1,
				resource: this.buildings[loc].resource,
				description: this.buildings[loc].description,
				quantity: 1,
				upgrades: this.buildings[loc].upgrades,
				cost: this.buildings[loc].cost,
				production: this.buildings[loc].production,
				manager: this.buildings[loc].manager,
				unlock: this.buildings[loc].unlock,
				prestige: this.buildings[loc].prestige,
				ui: this.buildings[loc].ui,
				tags: this.buildings[loc].tags
		};
		buildingInstances.push(newBldg);
		gameState.bldgs.push(newBldg);
	}
	
	// Creates a new building definition and adds it to BLDG_DEFS
	createBuilding(bldg) {
		BLDG_DEFS.push(bldg);
	}
	
	clickBuilding(id) {
		const amt = this.getOutput(id);
		const cooldown = this.getClickInterval(id);
		
		this.disableBuilding(id);
		setTimeout(() => this.enableBuilding(id), cooldown);
		
		resourceManager.addBits(amt);
		//emitEvent("buildingClicked", data => { stats.totalClicks++ });
	}
	
	modValue(attr, data) {
		let retVal = -1;
		
		switch (attr) {
			case "cooldown":
				if (data.op == "add") { buildingInstances[data.ID].production.clickInterval += data.value }
				if (data.op == "mult") { buildingInstances[data.ID].production.clickInterval *= data.value }
				if (data.op == "sub") { buildingInstances[data.ID].production.clickInterval -= data.value }
				if (data.op == "div") { buildingInstances[data.ID].production.clickInterval /= data.value }
				
				retVal = 1;
				break;
			case "production":
				if (data.type == "base") {
					if (data.op == "add") { buildingInstances[data.ID].production.base += data.value }
					if (data.op == "mult") { buildingInstances[data.ID].production.base *= data.value }
					if (data.op == "sub") { buildingInstances[data.ID].production.base -= data.value }
					if (data.op == "div") { buildingInstances[data.ID].production.base /= data.value }
				}
				if (data.type == "rate") {
					if (data.op == "add") { buildingInstances[data.ID].production.growthRate += data.value }
					if (data.op == "mult") { buildingInstances[data.ID].production.growthRate *= data.value }
					if (data.op == "sub") { buildingInstances[data.ID].production.growthRate -= data.value }
					if (data.op == "div") { buildingInstances[data.ID].production.growthRate /= data.value }
				}
				if (data.type == "factor") {
					buildingInstances[data.ID].production.growthFactor = data.value;
				}
				
				retVal = 1;
				break;
			case "power":
				if (data.op == "add") { buildingInstances[data.ID].production.powerUse += data.value }
				if (data.op == "mult") { buildingInstances[data.ID].production.powerUse *= data.value }
				if (data.op == "sub") { buildingInstances[data.ID].production.powerUse -= data.value }
				if (data.op == "div") { buildingInstances[data.ID].production.powerUse /= data.value }
				
				retVal = 1;
				break;
			case "bonus":
				if (data.op == "add") { buildingInstances[data.ID].production.bonus += data.value }
				if (data.op == "mult") { buildingInstances[data.ID].production.bonus *= data.value }
				if (data.op == "sub") { buildingInstances[data.ID].production.bonus -= data.value }
				if (data.op == "div") { buildingInstances[data.ID].production.bonus /= data.value }
				
				retVal = 1;
				break;
			default:
				return -1;
		}
		
		return retVal;
	}

	getOutput(id) {		
		let retVal = -1;
		
		switch (buildingInstances[id].production.growthFactor) {
			case "additive":
				retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + (buildingInstances[id].production.bonus * (buildingInstances[id].production.growthRate + buildingInstances[id].level)));
				break;			
			case "multiplicative":
				retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + (buildingInstances[id].production.bonus * (buildingInstances[id].production.growthRate * buildingInstances[id].level)));
				break;
			case "exponential":
				retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + (buildingInstances[id].production.bonus * (buildingInstances[id].production.growthRate ** buildingInstances[id].level)));
				break;
			default: 
				retVal = buildingInstances[id].quantity * ((buildingInstances[id].production.base * buildingInstances[id].prestige.multiplier) + (buildingInstances[id].production.bonus * (buildingInstances[id].production.growthRate ** buildingInstances[id].level)));
		}	
		
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
		const retVal = buildingInstances[id].cost.base * (buildingInstances[id].cost.growthRate ** buildingInstances[id].quantity);
		console.log(retVal);
		
		return retVal;
	}
	
	getUpgradeCost(bldg, upgr) {
		let retVal = -1;
		
		retVal = buildingInstances[bldg].upgrades[upgr].cost * (buildingInstances[bldg].upgrades[upgr].growthRate ** buildingInstances[bldg].upgrades[upgr].level);
		
		return retVal;
	}
	
	getUpgradeCoeff(bldg, upgr) {
		let retVal = -1;
		
		retVal = buildingInstances[bldg].upgrades[upgr].coeff * (buildingInstances[bldg].upgrades[upgr].growthRate ** buildingInstances[bldg].upgrades[upgr].level);
	
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
		let cost = this.getBuyCost(id) * amt;
		const powerCon = buildingInstances[id].production.powerUse * amt;
		
		if (gameState.money < cost) {
			emitEvent("error", { 
				type: "shop",
				buyOrSell: "buy",
				ID: id
			});
			
			return false;
		}
		
		buildingInstances[id].quantity += amt;
		resourceManager.subMoney(cost);
		resourceManager.addPowerCon(powerCon);
		cost = this.getBuyCost(id);
		
		emitEvent("buildingPurchased", {
			buildingId: id,
			quantity: buildingInstances[id].quantity,
			cost
		});
		
		return true;		
	}
	
	sellBuilding(id, amt) {
		let cost = this.getBuyCost(id) * amt;
		const powerCon = buildingInstances[id].production.powerUse * amt;
		
		if (buildingInstances[id].quantity < amt) {
			emitEvent("error", { 
				type: "shop",
				buyOrSell: "sell",
				ID: id
			});
			
			return false;
		}
		
		buildingInstances[id].quantity -= amt;
		resourceManager.addMoney(cost);
		resourceManager.subPowerCon(powerCon);
		cost = this.getBuyCost(id);
		
		emitEvent("buildingPurchased", {
			buildingId: id,
			quantity: buildingInstances[id].quantity,
			cost
		});
		
		return true;
	}
	
	upgradeBuilding(id, upgrade) {
		if (!buildingInstances[id].upgrades[upgrade.id]) {
			buildingInstances[id].upgrades[upgrade.id].push(upgrade);
		}
		
		buildingInstances[id].upgrades[upgrade.id].level++;
		buildingInstances[id].upgrades[upgrade.id].cost = this.getUpgradeCost(id, upgrade.id);
		buildingInstances[id].upgrades[upgrade.id].coeff = this.getUpgradeCoeff(id, upgrade.id);
		
		// Check if upgrade is predefined and if not reserve space for it
		if (!bldgUpgrades[id]) {
			bldgUpgrades[id] = [];
		}
		bldgUpgrades[id].push(upgrade);

		// Add scaling factor logic tree eventually
		switch (upgrade.type) {
			case "cost":
				buildingInstances[id].cost.base = (buildingInstances[id].cost.base / (1 + upgrade.coeff));
				break;
			case "cooldown":
				buildingInstances[id].production.clickInterval = (buildingInstances[id].production.clickInterval / (1 + upgrade.coeff));
				break;
			case "power":
				buildingInstances[id].production.powerUse = (buildingInstances[id].production.powerUse / (1 + upgrade.coeff));
				break;
			case "production":
				buildingInstances[id].production.base = (buildingInstances[id].production.base / (1 + upgrade.coeff));
				break;
			default:
		}
		
		emitEvent("buildingUpgraded", { 
			buildingId: id,
			buildingUpgr: upgrade
		});
	}
}

export const buildingManager = new BuildingManager();

export function initBuildings() {
	// Create Punchcard & Desktop instances by default
	buildingManager.addBuilding(BLDG_DEFS[0]);
	buildingManager.addBuilding(BLDG_DEFS[1]);
	// Consider initializing all base buildings?
 };