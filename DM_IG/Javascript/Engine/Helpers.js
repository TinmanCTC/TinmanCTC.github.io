---
permalink: /DM_IG/Javascript/Engine/Helpers.js
title: "Data Miner Idle Game"
layout: page
---

export const floaters = ["Hello World!", "Nobody here but us chickens!", "I wish I wish I was a fish!", "BYOB(Bring Your Own Bits)", "Why was six afraid of seven? Because seven ate nine!", "A long time ago, in a galaxy far, far away...", "Knock, knock!", "Orange you glad I didn't say banana?", "Banana!"];

export function tickTock() {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString();
}

export function drift() {
	let i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
}