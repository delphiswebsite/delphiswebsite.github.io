"use strict";

let canvas = document.querySelector("#mainCanvas");
let context = canvas.getContext("2d");

let meter = document.querySelector("#speedometer");
let lamp = document.querySelector("#lamp");

let frames = [
	"assets/spin1.gif",
	"assets/spin2.gif",
	"assets/spin3.gif",
	"assets/spin4.gif"
];

for (let i in frames) {
	let name = frames[i];
	frames[i] = new Image();
	frames[i].src = name;
}

let data = {
	rotation:	0.0,
	velocity:	0.0,
	speed:		0.0,
	
	moving:		false,
	braking:	false,
};

function update() {
	data.speed = data.velocity ** 1.5;
	data.rotation = (data.rotation + data.velocity / 2) % 360;
	let index = Math.floor(data.rotation / 90);

	context.drawImage(frames[index], 0, 0, 640, 360);

	meter.innerText = data.speed.toFixed(2);
	lamp.style.backgroundColor = `hsl(185, 100%, ${ (data.velocity / 2) }%)`;
	lamp.style.boxShadow = `inset 0px 0px 25px hsl(185, 100%, 20%)`;

	if (data.moving) {
		data.velocity += 0.25;
	} else if (data.velocity > 0) data.velocity -= 0.25;

	if (data.braking) {
		lamp.style.backgroundColor = `hsl(0, 100%, ${ (data.velocity / 2) }%)`;
		lamp.style.boxShadow = `inset 0px 0px 25px hsl(0, 100%, 20%)`;
		data.velocity -= 0.25 + (data.velocity ** 1.1) / 100;
	}

	if (data.velocity < 0) data.velocity = 0;

	window.requestAnimationFrame(update);
}

function keyDown(event) {
	switch (event.code) {
		case "ArrowUp":		data.moving = true;		break;
		case "ArrowDown":	data.braking = true;	break;
	}
}

function keyUp(event) {
	switch (event.code) {
		case "ArrowUp":		data.moving = false;	break;
		case "ArrowDown":	data.braking = false;	break;
	}
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

window.requestAnimationFrame(update);