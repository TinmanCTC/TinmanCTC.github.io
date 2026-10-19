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

export class BrokerManagers {
		constructor() {
			this.brokers = [];
		}
		
		// Adds a new instance of broker to buildingInstances utilizing BUILDING_DEFS
	addBroker(broker) {
		
	}	
	
}

export const brokerManager = new BrokerManager();

export function initBrokers() {
	
	brokerManager.addBroker(BROKER_DEFS[0]);
	
};