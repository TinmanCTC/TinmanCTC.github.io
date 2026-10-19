---
permalink: /DM_IG/Javascript/Data/Brokers.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Data/Brokers.js
 * 
 */
 
/* Format:
	

*/

export const BROKERS_DEFS = [
	{
		id: 0,
		name: "Your Mother",
		resource: "cash",
		description: "Incredibly easy to work with and always with your best interests in mind, but not the most technologically competent.",
		upgrades: [],
		cost: {
			base: 0,
			growthRate: 1.06,
			growthFactor: "exponential"
		},
		production: {
			base: 864,
			clickInterval: 100,
			bonus: 0,
			powerUse: 100,
			growthRate: 1.0,
			growthFactor: "multiplicative",
		},
		manager: {
			cost: 5000,
			clickInterval: 500,
			multiplier: 1.0,
		},
		unlock: {
			resource: "bits",
			gate: 0
		},
		prestige: {
			level: 0,
			multiplier: 1.0,
			scalesWith: "legacies"
		},
		ui: {
			icon: "brokerMother.png",
			elementID: "brokerMother_button",
			sortOrder: 1,
			
		},
		tags: ["production", "early-game", "default"]	
	}
	
];