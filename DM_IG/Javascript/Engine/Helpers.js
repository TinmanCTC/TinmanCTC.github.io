---
permalink: /DM_IG/Javascript/Engine/Helpers.js
title: "Data Miner Idle Game"
layout: page
---

export function tickTock() {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString();
}

export function drift() {
	i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
}