---
permalink: /DM_IG/Javascript/Interface/Components.js
title: "Data Miner Idle Game"
layout: page
---
/**
 * ../Interface/Components.js
 * 
 * 
 */
 
 export const INTERFACE_DEFS = [
	 // View Buttons
	 {
		 Production_Button: "<button data-view='production' id='production_button' class='tab-btn'><div class='tooltip'><img src='Assets/Images/prodButton.jpg' class='btn-img' id='prod-btn'><span class='tooltip-text'>Production</span></div></button>",
		 Research_Button: "<button data-view='research' id='research_button' class='tab-btn' type='button'>	<div class='tooltip'><img src='Assets/Images/researchButton.jpg' class='btn-img' id='res-btn'><span class='tooltip-text'>Research</span></div></button>",
		 Upgrades_Button: "<button data-view='upgrades' id='upgrades_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/upgradeButton.jpg' class='btn-img' id='upgr-btn'><span class='tooltip-text'>Upgrades</span></div></button>",
		 Managers_Button: "<button data-view='managers' id='managers_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/managerButton.jpg' class='btn-img' id='mang-btn'><span class='tooltip-text'>Managers</span></div></button>",
		 Settings_Button: "<button data-view='settings' id='settings_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/settingsButton.jpg' class='btn-img' id='sett-btn'><span class='tooltip-text'>Settings</span></div></button>"
	 },
	 // Production Building Buttons
	 {
		 Punchcard_Button: "<button data-view='Punchcard' id='punchcard_button' class='prod-btn' type='button'><img src='Assets/Images/punchcardButton.png' class='prod-img'></button>",
		 Desktop_Button: ""		 
	 },
	 // Data Broker Buttons
	 {
			brokerMother_Button: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerMother.png' class='broker-img'></button>",
			brokerCrypto_Button: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerCrypto.png' class='broker-img'></button>",
			brokerSandman_Button: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerSandman.png' class='broker-img'></button>",
			brokerWendy_Button: "<button data-view='brokerMother' id='brokerWendy_button' class='broker-btn' type='button'><img src='Assets/Images/brokerWendy.png' class='broker-img'></button>"
	 }
 
];