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

export const gameState = {
	bits: 0,
	money: 250,
	powerCon: 0,
	powerGen: 1000,
	bldgs: [],
	upgrades: [],
	achievements: [],
	legacy: 0,
	currentView: "production"
};

export function addMoney(amt) {
	gameState.money += amt;
};

export function addBits(amt) {
	gameState.bits += amt;
};