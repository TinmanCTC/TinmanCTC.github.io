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

export const BROKERS_ID = {
		MOTHER: 0,
		CRYPTO: 1,
		SANDMAN: 2,
		WENDY: 3
};

export const BROKERS_DEFS = [
	{
		id: 0,
		name: "Your Mother",
		resource: "cash",
		description: "Incredibly easy to work with and always with your best interests in mind, but not the most technologically competent.",
		upgrades: [],
		production: {
			multiplier: 1.0,
			clickInterval: 5000,
			bonus: 0,
			growthRate: 1.0,
			growthFactor: "multiplicative",
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
			icon: "brokerMother.jpeg",
			elementID: "brokerMother_button",
			sortOrder: 1,
			
		},
		tags: ["production", "early-game", "default"]	
	}
	
];