

function tickTock() {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString();
}

function drift() {
	i = Math.round(Math.random() * floaters.length);
	document.getElementById("float_bar").innerHTML = floaters[i];
}