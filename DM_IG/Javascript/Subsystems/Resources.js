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
 
 import { gameState } from ".../Javascript/Engine/stateManager.js";
 import { eventFeed } from ".../Javascript/Engine/eventManager.js";
 
 export class Resources {
	 constructor(id, name, baseRate) {
		 this.id = id;
		 this.name = name;
		 this.baseRate = baseRate;
		 this.multiplier = 1;
	 }
	 
	 get rate() {
		 return this.baseRate * this.multiplier;
	 }
	 
	 set rate(amt) {
		 this.baseRate = amt;
	 }
 }