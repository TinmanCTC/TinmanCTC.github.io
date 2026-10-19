---
permalink: /DM_IG/Javascript/Data/Buildings.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Data/Buildings.js
 * Contains object information for production buildings 
 * Utilized by Subsystems/Buildings.js
 * 
 */
 
/* Format:
	<BLDG_DEF>: {
		id: 
		name: 
		startUnlocked: 
		baseOutput: 
		baseBonus: 
		baseCost: 
		managerCost:
		powerUse: 
		clickInterval: 
		managerInterval: 
		imgStr:
	}

*/

export const BUILDING_ID = {
		PUNCHCARD: 0,
		DESKTOP: 1
};

export const BUILDING_DEFS = [
	{
		id: 0,
		name: "Punchcard",
		resource: "bits",
		description: "A vintage, manual punch card machine. It processes data... In its own way.",
		upgrades: [],
		cost: {
			base: 50,
			growthRate: 1.06,
			growthFactor: "exponential"
		},
		production: {
			base: 864,
			clickInterval: 3000,
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
			icon: "punchcard_framed.png",
			elementID: "punchcard_button",
			sortOrder: 1,
			
		},
		tags: ["production", "early-game", "default"]	
	}
	// Desktop 
];
