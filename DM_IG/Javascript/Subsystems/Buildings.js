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

import { gameState } from "./Javascript/Engine/stateManager.js";
import { eventFeed } from "./Javascript/Engine/eventManager.js";
import { BUILDING_DEFS } from "./Javascript/Data/Buildings.js";


export class Buildings {
	constructor(id, name, resourceID = 0, level = 0,quantity = 1,unlocked = false,baseProduction,baseCost,baseBonus = 0,powerUse,isClicked = false,timeClicked = 0,clickInterval,isManaged = false,mngCost = 500,mngInterval = 5000,imgString) {
		this.id = id;
		this.name = name;
		this.resourceID = resourceID;
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
 
 export function initBuildings() {
	
	let Punchcard = new Buildings(
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
				alert("Punchcard clicked at " + "time");
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
 