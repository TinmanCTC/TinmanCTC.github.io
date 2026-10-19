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
				cost: this.brokers[loc].cost,
				production: this.brokers[loc].production,
				manager: this.brokers[loc].manager,
				unlock: this.brokers[loc].unlock,
				prestige: this.brokers[loc].prestige,
				ui: this.brokers[loc].ui,
				tags: this.brokers[loc].tags,
				isClicked: false,
				timeClicked: 0,
				mngrTimeClicked: 0
		};
		brokerInstances.push(newBrkr);
	}	
	
}

export const brokerManager = new BrokerManager();

export function initBrokers() {
	
	brokerManager.addBroker(BROKERS_DEFS[0]);
	
};