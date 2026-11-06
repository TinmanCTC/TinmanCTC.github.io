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

export const BLDG_IDS = {
		PUNCHCARD: 0,
		DESKTOP: 1,
		CUBICLE: 2,
		LAN: 3,
		CHEAP_GEN: 4,
		CLOUD: 5,
		BLOCKCHAIN: 6,
		DIESEL_GEN: 7
};

export const BLDG_DEFS = [
	{
		id: 0,
		name: "Punchcard Machine",
		resource: "bits",
		description: "A vintage, manual punch card machine. It processes data... In its own way.",
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 91.7431,
				growthRate: 1.09
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 223.2142,
				growthRate: 1.12
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 434.7826,
				growthRate: 1.15
			}
		],
		cost: {
			base: 50,
			growthRate: 1.06,
			growthFactor: "exponential"
		},
		production: {
			base: 768,
			clickInterval: 1000,
			bonus: 0,
			powerUse: 100,
			growthRate: 1.01,
			growthFactor: "multiplicative",
		},
		manager: {
			cost: 5000,
			clickInterval: 500,
			multiplier: 1.0,
		},
		unlock: {
			resource: "bits",
			threshold: 0,
			yes: true,
			btn: false,
			disp: false
		},
		prestige: {
			level: 0,
			multiplier: 1.0,
			scalesWith: "legacies"
		},
		ui: {
			icon: "Assets/Images/punchcardButton.png",
			elementID: "punchcard_button",
			buyBtnID: "store-pnch-buy",
			buyBtnListener: "",
			sellBtnID: "store-pnch-sell",
			sellBtnListener: "",
			qtyPnlID: "store-pnchcrd-qty",
			shopPnlID: "store-pnchcrd-lbl",
			costPnlID: "store-pnchcrd-cst",
			shopDescriptor: "<b><u>Punchcard Machine [Cost: ",
			upgrPnlID: "upgr-pnchcrd-pnl",
			sortOrder: 1
		},
		tags: ["production", "early-game", "default"]	
	},
	// Desktop
	{
		id: 1,
		name: "Desktop",
		resource: "bits",
		description: "Your day to day consumer computer, capable of classical computation and internet surfing.",
		upgrades: [],
		cost: {
			base: 500,
			growthRate: 1.24,
			growthFactor: "exponential"
		},
		production: {
			base: 4096,
			clickInterval: 2000,
			bonus: 0,
			powerUse: 500,
			growthRate: 1.09,
			shopGrowthRate: 1.08,
			growthFactor: "multiplicative",
		},
		manager: {
			cost: 10000,
			clickInterval: 500,
			multiplier: 1.0,
		},
		unlock: {
			resource: "money",
			threshold: 21960,
			yes: false,
			btn: false,
			disp: false
		},
		prestige: {
			level: 0,
			multiplier: 1.0,
			scalesWith: "legacies"
		},
		ui: {
			icon: "desktopButton.jpg",
			elementID: "desktop_button",
			prodBtnListener: "",
			buyBtnID: "store-dsktp-buy",
			buyBtnListener: "",
			sellBtnID: "store-dsktp-sell",
			sellBtnListener: "",
			qtyPnlID: "store-dsktp-qty",
			shopPnlID: "store-dsktp-lbl",
			costPnlID: "store-dsktp-cst",
			shopDescriptor: "<b><u>Desktop Computer [Cost: ",
			sortOrder: 2
		},
		tags: ["production", "early-game", "default"]	
	}
];
