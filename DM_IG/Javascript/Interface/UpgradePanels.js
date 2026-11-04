---
permalink: /DM_IG/Javascript/Interface/UpgradePanels.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Interface/UpgradePanels.js
 * 
 * 
 */
 
import { emitEvent, onEvent } from "/DM_IG/Javascript/Engine/eventManager.js";
import { gameState, checkUnlocks } from "/DM_IG/Javascript/Engine/stateManager.js";
import { brokerInstances, brokerManager } from "/DM_IG/Javascript/Subsystems/Brokers.js";
import { BROKERS_ID } from "/DM_IG/Javascript/Data/Brokers.js";
import { buildingInstances, buildingManager } from "/DM_IG/Javascript/Subsystems/Buildings.js";
import { BLDG_IDS, BLDG_DEFS } from "/DM_IG/Javascript/Data/Buildings.js";
import { INTERFACE_DEFS, INTERFACE_ID } from "/DM_IG/Javascript/Interface/Components.js";

/*
END GOAL: MAKE THIS:

<div class="upgrade-panel">
	<div class="upgrade-header">
		<img class="upgrade-image" src="..." alt="Punchcard Machine">
		<h3>Punchcard Machine</h3>
	</div>
	<div class="upgrade-list">
		<div class="upgrade-row">
			<button>Base Production</button>
			<span>$250</span>
			<span>Lv 1</span>
		</div>
		<div class="upgrade-row">
			<button>Power Consumption</button>
			<span>$500</span>
			<span>Lv 0</span>
		</div>
		<div class="upgrade-row">
			<button>Manual Click Cooldown</button>
			<span>$500</span>
			<span>Lv 0</span>
		</div>
	</div>
</div>

*/


export function createBldgUpgrPnl(building, upgrades) {
	const pnl = document.createElement("div");
	pnl.classList.add("upgr-pnl");
	
	const hdr = document.createElement("div");
	hdr.classList.add("upgr-hdr");
	
	const list = document.createElement("div");
	list.classList.add("upgr-list");
	
	const img = document.createElement("img");
	img.src = building.ui.icon;
	img.classList.add("upgr-img");
	
	const title = document.createElement("h3");
	title.textContent = building.name;
	
	hdr.appendChild(img);
	hdr.appendChild(title);
	
	pnl.appendChild(hdr);	
	pnl.appendChild(list);
	
	return pnl;
}

export function createBldgUpgrRow(building, upgrades) {
	const row = document.createElement("div");
	row.classList.add("upgr-row");
	
	const btn = document.createElement("button");
	btn.classList.add("upgr-btn");
	btn.textContent = upgrades.name;
	btn.dataset.upgrID = upgrades.id;
	btn.dataset.bldgID = building.id;
	
	const costSpan = document.createElement("span");
	costSpan.classList.add("upgr-line");
	costSpan.textContent = "$" + upgrades.cost.toFixed(2);
	
	const lvlSpan = document.createElement("span");
	lvlSpan.classList.add("upgr-line");
	lvlSpan.style.alignContent = "space-around";
	lvlSpan.textContent = "Lvl: " + upgrades.level;
	
	row.appendChild(btn);
	row.appendChild(costSpan);
	row.appendChild(lvlSpan);
	
	return row;
}