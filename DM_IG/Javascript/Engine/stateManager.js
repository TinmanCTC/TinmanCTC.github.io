---
permalink: /DM_IG/Javascript/Engine/stateManager.js
title: "Data Miner Idle Game"
layout: page
---
/* Module: stateManager.js
*  Purpose: Handle game state, unlock prereqs, 
*  
*  Dependencies: Building, resource classes, 
*  
*  
*/

import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { resourceInstances, resourceManager } from "/DM_IG/Javascript/Subsystems/Resources.js";

import { addButton, addDisplay } from "/DM_IG/Javascript/Interface/UI.js";
import { INTERFACE_DEFS } from "/DM_IG/Javascript/Interface/Components.js";

import { BUILDING_ID, BUILDING_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { BROKERS_ID } from "/DM_IG/Javascript/Data/Brokers.js";

export const gameState = {
	bits: 0,
	lifetimeBits: 0,
	money: 250,
	lifetimeMoney: 0,
	powerCon: 0,
	powerGen: 1000,
	bldgs: [],
	upgrades: [],
	achievements: [],
	legacy: 0,
	currentView: "production"
};

export function checkUnlocks() {
	
	// Unlock Desktop Building
	if (gameState.lifetimeMoney >= 55296 && buildingInstances[1].unlock.yes == false) {
		buildingInstances[1].quantity = 0;
		buildingInstances[1].unlock.yes = true;
		
		addButton(INTERFACE_DEFS[1], "production-buttons", "desktop");
		addDisplay(INTERFACE_DEFS[4], "building-list", "desktop");
	}
}

// SETTER FUNCTIONS
export function addMoney(amt) {
	gameState.money += amt;
	gameState.lifetimeMoney += amt;
};

export function subMoney(amt) {
	gameState.money -= amt;
};

export function addBits(amt) {
	gameState.bits += amt;
	gameState.lifetimeBits += amt;
};

export function subBits(amt) {
	gameState.bits -= amt;
};

export function addPowerCon(amt) {
	gameState.powerCon += amt;
};

export function addPowerGen(amt) {
	gameState.powerGen += amt;
};

export function subPowerCon(amt) {
	gameState.powerCon -= amt;
};

export function subPowerGen(amt) {
	gameState.powerGen -= amt;
};

// GETTER FUNCTIONS
export function getMoney() {
	var retVal = gameState.money;
	
	return retVal;
};

export function getBits() {
	var retVal = gameState.bits;
	
	return retVal;
};

export function getPowerCon() {
	var retVal = gameState.powerCon;
	
	return retVal;
};

export function getPowerGen() {
	var retVal = gameState.powerGen;
	
	return retVal;
};