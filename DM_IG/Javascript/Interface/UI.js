---
permalink: /DM_IG/Javascript/Subsystems/UI.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Subsystems/UI.js
 * 
 * 
 */
 
import { gameState } from "/DM_IG/Javascript/Engine/stateManager.js";
import { buildingInstances } from "/DM_IG/Javascript/Subsystems/Buildings.js";

export function initUI() {
	// Initialize view buttons
	document.getElementById("view-buttons").innerHTML = 
		"<button data-view='production' id='production_button' class='tab-btn'><div class='tooltip'><img src='Assets/Images/prodButton.jpg' class='btn-img' id='prod-btn'><span class='tooltip-text'>Production</span></div></button>"
	
	
	// Punchcard - On by default
	document.getElementById("prod-first-row").innerHTML = "<button data-view='Punchcard' id='punchcard_button' class='prod-btn' type='button'><img src='Assets/Images/punchcard_framed.png' class='prod-img'></button>";
	
}