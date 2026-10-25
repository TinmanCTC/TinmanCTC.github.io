---
permalink: /DM_IG/Javascript/Subsystems/Resources.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Subsystems/Resources.js
 * 
 * 
 */
 
 import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
 import { eventFeed, pushEvent, emitEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
 import { RESOURCE_DEFS } from "/DM_IG/Javascript/Data/Resources.js";
 import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
 
 export const resourceInstances = [];
 
 export class ResourceManager {
	 constructor() {
		 this.resources = [];
	 }
	 
	 addResource(resrc) {
		 this.resources.push(resrc);
		 let loc = (this.resources.length - 1);
		 let newResrc = {
			 id: this.resources[loc].id,
			 name: this.resources[loc].name,
			 baseRate: this.resources[loc].baseRate,
			 multiplier: this.resources[loc].multiplier,
			 elementID: this.resources[loc].elementID
		 }
		 
		 
		 resourceInstances.push(newResrc);
	 }
	 
	 createResource(resrc) {
		 RESOURCE_DEFS.push(resrc);
	 }
	 
	addMoney(amt) {
		gameState.money += amt;
		gameState.lifetimeMoney += amt;
		
		emitEvent("moneyChanged", {
			current: gameState.money,
			lifetime: gameState.lifetimeMoney,
			delta: amt
		});
	}
	
	subMoney(amt) {
		gameState.money -= amt;
		
		emitEvent("moneyChanged", {
			current: gameState.money,
			lifetime: gameState.lifetimeMoney,
			delta: amt
		});
	}
	
	addBits(amt) {
		gameState.bits += amt;
		gameState.lifetimeBits += amt;
		
		emitEvent("bitsChanged", {
			current: gameState.bits,
			lifetime: gameState.lifetimeBits,
			delta: amt
		});
	}
	
	subBits(amt) {
		gameState.bits -= amt;
		
		emitEvent("bitsChanged", {
			current: gameState.bits,
			lifetime: gameState.lifetimeBits,
			delta: amt
		});
	}
	
	addPowerCon(amt) {
		gameState.powerCon += amt;
		
		emitEvent("wattsChanged", {
			current: (gameState.powerGen - gameState.powerCon),
			delta: amt
		});
		
		//pushEvent("wattsChange", resourceInstances[2].elementID);
	}
	
	addPowerGen(amt) {
		gameState.powerGen += amt;
		
		emitEvent("wattsChanged", {
			current: (gameState.powerGen - gameState.powerCon),
			delta: amt
		});
		
		//pushEvent("wattsChange", resourceInstances[2].elementID);
	}
	
	subPowerCon(amt) {
		gameState.powerCon -= amt;
		
		emitEvent("wattsChanged", {
			current: (gameState.powerGen - gameState.powerCon),
			delta: amt
		});
		//pushEvent("wattsChange", resourceInstances[2].elementID);
	}
	
	subPowerGen(amt) {
		gameState.powerGen -= amt;
		
		emitEvent("wattsChanged", {
			current: (gameState.powerGen - gameState.powerCon),
			delta: amt
		});
		
		//pushEvent("wattsChange", resourceInstances[2].elementID);
	}
	
	getMoney() {
		var retVal = gameState.money;
	
		return retVal;
	}

	getBits() {
		var retVal = gameState.bits;
	
		return retVal;
	}

	getPowerCon() {
		var retVal = gameState.powerCon;
	
		return retVal;
	}

	getPowerGen() {
		var retVal = gameState.powerGen;
	
		return retVal;
	}
 }
 
 export const resourceManager = new ResourceManager();
 
 export function initResources() {
	 resourceManager.addResource(RESOURCE_DEFS[0]);
	 resourceManager.addResource(RESOURCE_DEFS[1]);
	 resourceManager.addResource(RESOURCE_DEFS[2]);
	 //resourceManager.addResource(RESOURCE_DEFS[2]);	//qBits - locked by default
 }