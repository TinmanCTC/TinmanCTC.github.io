---
permalink: /DM_IG/Javascript/Subsystems/Brokers.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Subsystems/Brokers.js
 * 
 * 
 */
 
import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { eventFeed } from "/DM_IG/Javascript/Engine/eventManager.js";
import { resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";

import { BROKERS_DEFS } from "/DM_IG/Javascript/Data/Brokers.js";

export const brokerInstances = [];

export class BrokerManager {
		constructor() {
			this.brokers = [];
		}
		
		// Adds a new instance of broker to buildingInstances utilizing BUILDING_DEFS
	addBroker(broker) {
		this.brokers.push(broker);
		let loc = (this.brokers.length - 1);
		let newBrkr = {
				id: this.brokers[loc].id,
				name: this.brokers[loc].name,
				level: 1,
				resource: this.brokers[loc].resource,
				description: this.brokers[loc].description,
				quantity: 1,
				upgrades: [],
				production: this.brokers[loc].production,
				unlock: this.brokers[loc].unlock,
				prestige: this.brokers[loc].prestige,
				ui: this.brokers[loc].ui,
				tags: this.brokers[loc].tags
		};
		brokerInstances.push(newBrkr);
	}	
	
	sellBits(id) {
		var amt = (brokerInstances[id].production.multiplier * gameState.bits) + brokerInstances[id].production.bonus;
		var btn = document.getElementById(brokerInstances[id].ui.elementID);
		
		resourceManager.addMoney(amt);
		resourceManager.subBits(gameState.bits);
		
		btn.disabled = true;
		setTimeout(function() { btn.disabled = false; }, brokerInstances[id].production.clickInterval);
	}
}

export const brokerManager = new BrokerManager();

export function initBrokers() {
	
	brokerManager.addBroker(BROKERS_DEFS[0]);
	
};