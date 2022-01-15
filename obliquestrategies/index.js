"use strict";

let card = document.querySelector("#card");
let strategy = document.querySelector("#strategy");

function flipStart() {
	card.classList.add("flip-start");
	card.addEventListener("animationend", flipMiddle);
}

function flipMiddle() {
	let index = Math.floor(Math.random() * STRATEGIES.length);
	strategy.innerText = STRATEGIES[index];

	card.removeEventListener("animationend", flipMiddle);
	card.classList.remove("flip-start");
	card.classList.add("flip-end");
	card.addEventListener("animationend", flipEnd);
}

function flipEnd() {
	card.classList.remove("flip-end");
	card.removeEventListener("animationend", flipEnd);
}

card.addEventListener("click", flipStart);
flipStart();