---
permalink: /DM_IG/Javascript/Subsystems/Buildings.js
title: "Data Miner Idle Game"
layout: page
---
//import Building from "./DM_IG/Javascript/Data/Buildings.js";

/**
 * ../Subsystems/Buildings.js
 * Contains object information for production buildings 
 * Utilized by Subsystems/Buildings.js
 * 
 */

const Building = {
	Punchcard: {
		id: "punchcard",
		name: "Punch Card Computer",
		startUnlocked: true,
		baseOutput: 864,
		baseBonus: 0,
		baseCost: 50,
		managerCost: 5000,
		powerUse: 100,
		clickInterval: 100,
		managerInterval: 500,
		imgStr: "Assets/Images/punchcard_framed.png"
	},
	Desktop: {
		id: "desktop",
		name: "Desktop Computer",
		startUnlocked: false,
		baseOutput: 2056,
		baseBonus: 0,
		baseCost: 1000,
		managerCost: 5000,
		powerUse: 250,
		clickInterval: 2000,
		managerInterval: 7500,
		imgStr: "desktop_img"
	},
	Cubicle: {
		id: "cubicle",
		name: "Cubicle Workstation",
		startUnlocked: false,
		baseOutput: 32568,
		baseBonus: 0,
		baseCost: 3500,
		managerCost:25000,
		powerUse: 500,
		clickInterval: 5000,
		managerInterval: 10000,
		imgStr: "cubicle_img"
	},
	LAN: {
		id: "lan",
		name: "LAN Server",
		startUnlocked: false,
		baseOutput: 1024000,
		baseBonus: 0,
		baseCost: 7500,
		managerCost: 40000,
		powerUse: 2000,
		clickInterval:  10000,
		managerInterval: 15000,
		imgStr: "lan_img"
	},
	Cheap_Gen: {
		id: "cheapGen",
		name: "Cheap Generator",
		startUnlocked: false,
		baseOutput: 10000,
		baseBonus: 0,
		baseCost: 15000,
		powerUse: 10000,
		clickInterval: 30000,
		imgStr: "cheap_gen_img"
	},
	Cloud: {
		id: "cloud",
		name: "Cloud Server",
		startUnlocked: false,
		baseOutput: 10240000,
		baseBonus: 0,
		baseCost: 25000,
		managerCost: 60000,
		powerUse: 4000,
		clickInterval: 30000,
		managerInterval: 15000,
		imgStr: "cloud_img"
	},
	Blockchain: {
		id: "blockchain",
		name: "Blockchain Processor",
		startUnlocked: false,
		baseOutput: 5120000,
		baseBonus: 0.05,
		baseCost: 100000,
		managerCost: 100000,
		powerUse: 10000,
		clickInterval: 10000,
		managerInterval: 15000,
		imgStr: "blockchain_img"
	}
};

let bldg1 = [];
let bldg2 = [];

class Buildings {
	constructor(id, name,level = 0,quantity = 1,unlocked = false,baseProduction,baseCost,baseBonus = 0,powerUse,isClicked = false,timeClicked = 0,clickInterval,isManaged = false,mngCost = 500,mngInterval = 5000,imgString) {
		this.id = id;
		this.name = name;
		this.level = level;
		this.quantity = quantity;
		this.unlocked = unlocked;
		this.baseProduction = baseProduction;
		this.baseCost = baseCost;
		this.baseBonus = baseBonus;
		this.powerUse = powerUse;
		this.isClicked = isClicked;
		this.timeClicked = timeClicked;
		this.clickInterval = clickInterval;
		this.isManaged = isManaged;
		this.mngCost = mngCost;
		this.mngInterval = mngInterval;
		this.imgString = imgString;
		}
				
		enable() {
			
		}
		
		disable() {
			
		}
		
		buy(amt) {
			this.quantity += amt;
		}
		
		sell(amt) {
			this.quantity -= amt;
		}
		
		click() {
			this.clicked = true;
			this.timeClicked = Date.now();
		}
		
		mngrClick() {
			
		}
				
 };
 
 function initBuildings() {
	
	bldg1 = new Buildings(
		Building.Punchcard.id,
		Building.Punchcard.name,
		1,
		1,
		Building.Punchcard.startUnlocked,
		Building.Punchcard.baseOutput,
		Building.Punchcard.baseCost,
		Building.Punchcard.baseBonus,
		Building.Punchcard.powerUse,
		false,
		0,
		Building.Punchcard.clickInterval,
		false,
		Building.Punchcard.managerInterval,
		Building.Punchcard.imgStr);
	
		document.getElementById("prod-first-row").innerHTML = "<img src='" + Punchcard.imgString + "' class='prod-img' id='punchcard-btn'>";
		//document.getElementById("prod-first-row").innerHTML = "Test!";
 }