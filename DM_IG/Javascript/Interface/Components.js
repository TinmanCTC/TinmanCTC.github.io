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
 
 export const INTERFACE_ID = {
	 VIEW_BUTTONS: 0,
	 PRODUCTION_BUTTONS: 1,
	 BROKER_BUTTONS: 2,
	 RESOURCE_DISP: 3,
	 STORE_DISP: 4
 };
 
 export const INTERFACE_DEFS = [
	 // View Buttons
	 {
		 Production_Btn: "<button data-view='production' id='production_button' class='tab-btn'><div class='tooltip'><img src='Assets/Images/prodButton.jpg' class='btn-img' id='prod-btn'><span class='tooltip-text'>Production</span></div></button>",
		 Research_Btn: "<button data-view='research' id='research_button' class='tab-btn' type='button'>	<div class='tooltip'><img src='Assets/Images/researchButton.jpg' class='btn-img' id='res-btn'><span class='tooltip-text'>Research</span></div></button>",
		 Upgrades_Btn: "<button data-view='upgrades' id='upgrades_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/upgradeButton.jpg' class='btn-img' id='upgr-btn'><span class='tooltip-text'>Upgrades</span></div></button>",
		 Managers_Btn: "<button data-view='managers' id='managers_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/managerButton.jpg' class='btn-img' id='mang-btn'><span class='tooltip-text'>Managers</span></div></button>",
		 Settings_Btn: "<button data-view='settings' id='settings_button' class='tab-btn' type='button'><div class='tooltip'><img src='Assets/Images/settingsButton.jpg' class='btn-img' id='sett-btn'><span class='tooltip-text'>Settings</span></div></button>"
	 },
	 // Production Building Buttons
	 {
		 Punchcard_Btn: "<button data-view='Punchcard' id='punchcard_button' class='prod-btn' type='button'><img src='Assets/Images/punchcardButton.png' class='prod-img'></button>",
		 Desktop_Btn: "<button data-view='Desktop' id='desktop_button' class='prod-btn' type='button'><img src='Assets/Images/desktopButton.jpg' class='prod-img'></button>"		 
	 },
	 // Data Broker Buttons
	 {
			brokerMother_Btn: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerMother.jpeg' class='broker-img'></button>",
			brokerCrypto_Btn: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerCrypto.jpeg' class='broker-img'></button>",
			brokerSandman_Btn: "<button data-view='brokerMother' id='brokerMother_button' class='broker-btn' type='button'><img src='Assets/Images/brokerSandman.jpg' class='broker-img'></button>",
			brokerWendy_Btn: "<button data-view='brokerMother' id='brokerWendy_button' class='broker-btn' type='button'><img src='Assets/Images/brokerWendy.jpeg' class='broker-img'></button>"
	 },
	 // Resource Display Panels
	 {
		 resourceCash_Pnl: "<div id='cash-disp' class='resource-disp'><b><u>Cash:</u></b> <span id='Resource_Cash'></p></div>",
		 resourceBits_Pnl: "<div id='bits-disp' class='resource-disp'><b><u>Bits:</u></b> <span id='Resource_Bits'></p></div>",
		 resourceWatts_Pnl: "<div id='watts-disp' class='resource-disp'><b><u>Watts:</u></b> <span id='Resource_Watts'></p></div>",
		 resourceQbits_Pnl: "<div id='qbits-disp' class='resource-disp'><b><u>qBits:</u></b> <span id='Resource_Qbits'></p></div>"
	 },
	 // Store Panels
	 {
		 storePunchcard_Pnl: "<div id='store-pnch-row' class='store-display'><span id='store-pnchcrd-lbl'></span><span id='store-pnchcrd-qty'></span><button id='store-pnch-buy' class='store-btn'>Buy</button><button id='store-pnch-sell' class='store-btn'>Sell</button></div>",
		 storeDesktop_Pnl: "<div id='store-pnch-row' class='store-display'><span id='store-dsktp-lbl'></span><span id='store-dsktp-qty'></span><button id='store-dsktp-buy' class='store-btn'>Buy</button><button id='store-dsktp-sell' class='store-btn'>Sell</button></div>"
	 }
];