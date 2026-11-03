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

