---
permalink: /DM_IG/Javascript/Subsystems/Buildings.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Subsystems/Buildings.js
 * Contains object information for production buildings
 * 
 */

// Template for default buildings
const Building = {
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
	// Level 0
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
	// Level 1
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
		managerInterval:		7500,
		imgStr: "desktop_img"
	}
	// Level 2
};

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
			this.unlocked = true;
		}
		
		disable() {
			this.unlocked = false;
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
	
		document.getElementById("prod-first-row").innerHTML = "<button data-view='Punchcard' id='punchcard_button' class='prod-btn' type='button'><img src='Assets/Images/punchcard_framed.png' class='prod-img'></button>";
		// Punchcard - On by default
		
		let punchcardButtonID = document.getElementById("punchcard_button");
		punchcardButtonID.addEventListener("click", function () {
			let time = Date.now;
			let punchcardTimeClicked = Punchcard.timeClicked;
			if ((time - punchcardTimeClicked) > Punchcard.clickInterval) {
				Punchcard.timeClicked = time;
				alert("Punchcard clicked at " + time");
			} else {
				if (!Punchcard.isClicked) {
					Punchcard.timeClicked = time;
					alert("Punchcard clicked at " + time);
				} else {
					alert("Punchcard clicked too early!");
				}
			}
		});
 };
 