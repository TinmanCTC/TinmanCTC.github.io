---
permalink: /DM_IG/Javascript/Subsystems/Buildings.js
title: "Data Miner Idle Game"
layout: page
---
import Building from "/DM_IG/Javascript/Data/Buildings.js";

/**
 * ../Subsystems/Buildings.js
 * Contains object information for production buildings 
 * Utilized by Subsystems/Buildings.js
 * 
 */

let Punchcard = [];
let Desktop = [];

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
	
	
	Punchcard = new Buildings(
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
	
		//document.getElementById("prod-first-row").innerHTML = "<img src='" + Punchcard.imgString + "' class='prod-img' id='punchcard-btn'>";
		document.getElementById("prod-first-row").innerHTML = "Test!";
 }