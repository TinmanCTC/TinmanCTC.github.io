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
 import { eventFeed, pushEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
 import { RESOURCE_DEFS } from "/DM_IG/Javascript/Data/Resources.js";
 
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
		pushEvent("cashChange", resourceInstances[0].elementID);
	}
	
	addBits(amt) {
		gameState.bits += amt;
		pushEvent("bitsChange", resourceInstances[1].elementID);
	}
	
	addPowerCon(amt) {
		
	}
	
	addPowerGen(amt) {
		
	}
 }
 
 export const resourceManager = new ResourceManager();
 
 export function initResources() {
	 resourceManager.addResource(RESOURCE_DEFS[0]);
	 resourceManager.addResource(RESOURCE_DEFS[1]);
	 resourceManager.addResource(RESOURCE_DEFS[2]);
	 //resourceManager.addResource(RESOURCE_DEFS[2]);	//qBits - locked by default
 }