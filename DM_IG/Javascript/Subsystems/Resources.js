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
 import { eventFeed } from "/DM_IG/Javascript/Engine/eventManager.js";
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
	 
	 get rate(id) {
		 return RESOURCE_DEFS[id].baseRate * RESOURCE_DEFS[id].multiplier;
	 }
	 
	 set rate(id, amt) {
		 RESOURCE_DEFS[id].baseRate = amt;
	 }
	 
	 createResource(resrc) {
		 RESOURCE_DEFS.push(resrc);
	 }
 }
 
 export const resourceManager = new ResourceManager();
 
 export function initResources() {
	 resourceManager.addResource(RESOURCE_DEFS[0]);
	 resourceManager.addResource(RESOURCE_DEFS[1]);
	 //resourceManager.addResource(RESOURCE_DEFS[2]);	//qBits - locked by default
 }