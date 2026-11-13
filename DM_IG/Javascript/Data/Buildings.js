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
		description: "A vintage, manual punch card machine. It processes data... In its own way. You're probably better off selling it as an antique and buying a regular desktop computer.",
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 91.7431,
				growthRate: 1.09,
				type: "production",
				coeff: 0.01,
				btnID: "pnch-upgr-base-prod",
				lvlID: "pnch-upgr-base-prod-lvl",
				costID: "pnch-upgr-base-prod-cost"
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 223.2142,
				growthRate: 1.12,
				type: "power",
				coeff: 0.05,
				btnID: "pnch-upgr-power-con",
				lvlID: "pnch-upgr-power-con-lvl",
				costID: "pnch-upgr-power-con-cost"
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 434.7826,
				growthRate: 1.15,
				type: "cooldown",
				coeff: 0.1,
				btnID: "pnch-upgr-cooldown",
				lvlID: "pnch-upgr-cooldown-lvl",
				costID: "pnch-upgr-cooldown-cost"
			}
		],
		cost: {
			base: 1000,
			growthRate: 1.06,
			growthFactor: "exponential"
		},
		production: {
			base: 960,
			clickInterval: 2500,
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
			descID: "bldg-pnch-desc",
			buyBtnID: "store-pnch-buy",
			sellBtnID: "store-pnch-sell",
			qtyPnlID: "store-pnchcrd-qty",
			shopID: "store-pnch-row",
			shopPnlID: "store-pnchcrd-lbl",
			costPnlID: "store-pnchcrd-cst",
			shopDescriptor: "Punchcard Machine [Cost: ",
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
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 219.2982,
				growthRate: 1.14,
				type: "production",
				coeff: 0.05,
				btnID: "dsktp-upgr-base-prod",
				lvlID: "dsktp-upgr-base-prod-lvl",
				costID: "dsktp-upgr-base-prod-cost"
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 427.3054,
				growthRate: 1.17,
				type: "power",
				coeff: 0.075,
				btnID: "dsktp-upgr-power-con",
				lvlID: "dsktp-upgr-power-con-lvl",
				costID: "dsktp-upgr-power-con-cost"
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 833.3333,
				growthRate: 1.20,
				type: "cooldown",
				coeff: 0.1,
				btnID: "dsktp-upgr-cooldown",
				lvlID: "dsktp-upgr-cooldown-lvl",
				costID: "dsktp-upgr-cooldown-cost"
			}
		],
		cost: {
			base: 750,
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
			threshold: 1000,
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
			icon: "Assets/Images/desktopButton.jpg",
			elementID: "desktop_button",
			descID: "bldg-dsktp-desc",
			buyBtnID: "store-dsktp-buy",
			sellBtnID: "store-dsktp-sell",
			qtyPnlID: "store-dsktp-qty",
			shopPnlID: "store-dsktp-lbl",
			costPnlID: "store-dsktp-cst",
			shopDescriptor: "<b><u>Desktop Computer [Cost: ",
			upgrPnlID: "upgr-dsktp-pnl",
			upgrLvlID: "upgr-dsktp-lvl",
			upgrCostID: "upgr-dsktp-cost",
			sortOrder: 2
		},
		tags: ["production", "early-game", "default"]	
	},
	{
		id: 2,
		name: "Cubicle Workstation",
		resource: "bits",
		description: "",
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 219.2982,
				growthRate: 1.14,
				type: "production",
				coeff: 0.05,
				btnID: "cbcl-upgr-base-prod",
				lvlID: "cbcl-upgr-base-prod-lvl",
				costID: "cbcl-upgr-base-prod-cost"
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 427.3054,
				growthRate: 1.17,
				type: "power",
				coeff: 0.075,
				btnID: "cbcl-upgr-power-con",
				lvlID: "cbcl-upgr-power-con-lvl",
				costID: "cbcl-upgr-power-con-cost"
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 833.3333,
				growthRate: 1.20,
				type: "cooldown",
				coeff: 0.1,
				btnID: "cbcl-upgr-cooldown",
				lvlID: "cbcl-upgr-cooldown-lvl",
				costID: "cbcl-upgr-cooldown-cost"
			}
		],
		cost: {
			base: 750,
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
			threshold: 1000,
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
			icon: "Assets/Images/desktopButton.jpg",
			elementID: "desktop_button",
			descID: "bldg-cbcl-desc",
			buyBtnID: "store-cbcl-buy",
			sellBtnID: "store-cbcl-sell",
			qtyPnlID: "store-cbcl-qty",
			shopPnlID: "store-cbcl-lbl",
			costPnlID: "store-cbcl-cst",
			shopDescriptor: "<b><u>Cubicle Workstation [Cost: ",
			upgrPnlID: "upgr-cbcl-pnl",
			upgrLvlID: "upgr-cbcl-lvl",
			upgrCostID: "upgr-cbcl-cost",
			sortOrder: 2
		},
		tags: ["production", "early-game", "default"]	
	},
	{
		id: 3,
		name: "Cloud Server",
		resource: "bits",
		description: "",
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 219.2982,
				growthRate: 1.14,
				type: "production",
				coeff: 0.05,
				btnID: "cloud-upgr-base-prod",
				lvlID: "cloud-upgr-base-prod-lvl",
				costID: "cloud-upgr-base-prod-cost"
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 427.3054,
				growthRate: 1.17,
				type: "power",
				coeff: 0.075,
				btnID: "cloud-upgr-power-con",
				lvlID: "cloud-upgr-power-con-lvl",
				costID: "cloud-upgr-power-con-cost"
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 833.3333,
				growthRate: 1.20,
				type: "cooldown",
				coeff: 0.1,
				btnID: "cloud-upgr-cooldown",
				lvlID: "cloud-upgr-cooldown-lvl",
				costID: "cloud-upgr-cooldown-cost"
			}
		],
		cost: {
			base: 750,
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
			threshold: 1000,
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
			icon: "Assets/Images/desktopButton.jpg",
			elementID: "cloud_button",
			descID: "bldg-cloud-desc",
			buyBtnID: "store-cloud-buy",
			sellBtnID: "store-cloud-sell",
			qtyPnlID: "store-cloud-qty",
			shopPnlID: "store-cloud-lbl",
			costPnlID: "store-cloud-cst",
			shopDescriptor: "<b><u>Cloud Server [Cost: ",
			upgrPnlID: "upgr-cloud-pnl",
			upgrLvlID: "upgr-cloud-lvl",
			upgrCostID: "upgr-cloud-cost",
			sortOrder: 2
		},
		tags: ["production", "early-game", "default"]	
	},
	{
		id: 4,
		name: "Cheap Generator",
		resource: "power",
		description: "A big box retail brand gas generator. Loud and inefficient, but it gets the job done.",
		upgrades: [
			{
				id: 0,
				name: "Base Production",
				level: 1,
				cost: 219.2982,
				growthRate: 1.14,
				type: "production",
				coeff: 0.05,
				btnID: "chpGen-upgr-base-prod",
				lvlID: "chpGen-upgr-base-prod-lvl",
				costID: "chpGen-upgr-base-prod-cost"
			},
			{
				id: 1,
				name: "Power Consumption",
				level: 1,
				cost: 427.3054,
				growthRate: 1.17,
				type: "power",
				coeff: 0.075,
				btnID: "chpGen-upgr-power-con",
				lvlID: "chpGen-upgr-power-con-lvl",
				costID: "chpGen-upgr-power-con-cost"
			},
			{
				id: 2,
				name: "Click Cooldown",
				level: 1,
				cost: 833.3333,
				growthRate: 1.20,
				type: "cooldown",
				coeff: 0.1,
				btnID: "chpGen-upgr-cooldown",
				lvlID: "chpGen-upgr-cooldown-lvl",
				costID: "chpGen-upgr-cooldown-cost"
			}
		],
		cost: {
			base: 500,
			growthRate: 1.24,
			growthFactor: "exponential"
		},
		production: {
			base: 2000,
			clickInterval: 10000,
			bonus: 0,
			powerUse: 0,
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
			resource: "power",
			threshold: 0,
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
			icon: "Assets/Images/cheapGenButton.jpeg",
			elementID: "cheapGen_button",
			descID: "bldg-chpGen-desc",
			buyBtnID: "store-chpGen-buy",
			sellBtnID: "store-chpGen-sell",
			qtyPnlID: "store-chpGen-qty",
			shopPnlID: "store-chpGen-lbl",
			costPnlID: "store-chpGen-cst",
			shopDescriptor: "<b><u>Cheap Generator [Cost: ",
			upgrPnlID: "upgr-chpGen-pnl",
			upgrLvlID: "upgr-chpGen-lvl",
			upgrCostID: "upgr-chpGen-cost",
			sortOrder: 3
		},
		tags: ["production", "early-game", "default"]	
	}
];
