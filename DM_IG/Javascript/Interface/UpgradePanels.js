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
import { addComponent } from "/DM_IG/Javascript/Interface/UI.js";
import { UPGR_DEFS } from "/DM_IG/Javascript/Data/Upgrades.js";

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


export function initBldgUpgrPnl() {
	addComponent("upgr-list", INTERFACE_DEFS[INTERFACE_ID.UPGRADES_DISP].upgradesButtons);
	addBldgUpgrPnl(buildingInstances[BLDG_IDS.PUNCHCARD]);
	
	document.getElementById("upgr-list").style.display = "grid";
	document.getElementById("upgr-list").style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
	
	// Add Upgrade Button Listeners 
	document.getElementById("upgr-list").addEventListener("click", 
	e => {
		if (e.target.matches(".bldg-upgr-btn")) {
			const upgrId = e.target.dataset.upgrID;
			const bldgId = e.target.dataset.bldgID;
			const upgrCost = buildingManager.getUpgradeCost(bldgId, upgrId);
			const upgrBtn = document.getElementById(buildingInstances[bldgId].upgrades[upgrId].btnID);
			
			if (gameState.money < upgrCost) {
				upgrBtn.textContent = "Not enough money!";
				
				setTimeout(function() {
					upgrBtn.textContent = e.target.dataset.txt;
				}, 1500);
				
				return 0;
			}
			
			resourceManager.subMoney(upgrCost);
			buildingManager.upgradeBuilding(bldgId, buildingInstances[bldgId].upgrades[upgrId]);
		
		}
	});
}

export function createBldgUpgrPnl(building, upgrades) {
	const pnl = document.createElement("div");
	pnl.classList.add("bldg-upgr-pnl");
	
	const hdr = document.createElement("div");
	hdr.classList.add("bldg-upgr-hdr");
	
	const list = document.createElement("div");
	list.classList.add("bldg-upgr-list");
	
	const img = document.createElement("img");
	img.src = building.ui.icon;
	img.classList.add("bldg-upgr-img");
	
	const title = document.createElement("h3");
	title.textContent = building.name;
	
	hdr.appendChild(img);
	hdr.appendChild(title);
	
	pnl.appendChild(hdr);	
	pnl.appendChild(list);
	
	return pnl;
}

export function createBldgUpgrRow(building, upgrades) {
	const upgrCost = buildingManager.getUpgradeCost(building.id, upgrades.id);
	
	const row = document.createElement("div");
	row.classList.add("bldg-upgr-row");
	
	const btn = document.createElement("button");
	btn.classList.add("bldg-upgr-btn");
	btn.id = upgrades.btnID;
	btn.textContent = upgrades.name;
	btn.dataset.txt = upgrades.name;
	btn.dataset.upgrID = upgrades.id;
	btn.dataset.bldgID = building.id;
	
	const costSpan = document.createElement("span");
	costSpan.classList.add("bldg-upgr-line");
	costSpan.id = upgrades.costID;
	costSpan.textContent = "$" + upgrCost.toFixed(2);
	
	const lvlSpan = document.createElement("span");
	lvlSpan.classList.add("bldg-upgr-line");
	lvlSpan.id = upgrades.lvlID;
	lvlSpan.textContent = "Lvl: " + upgrades.level;
	
	row.appendChild(btn);
	row.appendChild(costSpan);
	row.appendChild(lvlSpan);
	
	return row;
}

// Assumes buildingInstances[ind] is already initialized
// should probably fix in the future
export function addBldgUpgrPnl(building) {
	const pnl = createBldgUpgrPnl(buildingInstances[building.id], buildingInstances[building.id].upgrades[0]);
	const upgrRow1 = createBldgUpgrRow(buildingInstances[building.id], buildingInstances[building.id].upgrades[0]);
	const upgrRow2 = createBldgUpgrRow(buildingInstances[building.id], buildingInstances[building.id].upgrades[1]);
	const upgrRow3 = createBldgUpgrRow(buildingInstances[building.id], buildingInstances[building.id].upgrades[2]);
	
	pnl.append(upgrRow1, upgrRow2, upgrRow3);
	
	document.getElementById("upgr-list").appendChild(pnl);
}