const gameContainer = document.getElementById("game");
const restartBtn = document.getElementById("restart-btn");
const youWin = document.getElementById("winner");
const bestScore = document.getElementById("bestScore");
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start");

bestScore.innerText = localStorage.getItem("bestScore");

const GIF = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
];

function shuffle(array) {
	let counter = array.length;

	while (counter > 0) {

		let index = Math.floor(Math.random() * counter);

		counter--;

		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledGif = shuffle(GIF);

function createDivForGif(gifArray) {


	for (let gif of gifArray) {

		const newDiv = document.createElement("div");
		newDiv.classList.add(gif);
		newDiv.addEventListener("click", handleCardClick);
		gameContainer.append(newDiv);

	}
}

// TODO: Implement this function!

let previous, next;
let score = 0;
let previousGif = "";
let nextGif = "";
let flag = true;
let gifArray = [];

const gifCount = GIF.length / 2;

function handleCardClick(event) {

	let gif = event.target.classList.value;

	if (!gifArray.includes(gif)) {

		if (previousGif.length == 0 && flag) {

			previousGif = gif;
			previous = event;
			event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;
			score += 1;

		} else if (previous.target != event.target && flag) {

			if (gif == previousGif) {

				gifArray.push(previousGif);
				event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;
				previousGif = "";
				previous = "";

			} else {

				flag = false;
				nextGif = gif;
				next = event;
				event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;

				setTimeout(() => {

					previous.target.style.backgroundImage = `url(gifs/giphy.png)`;
					next.target.style.backgroundImage = `url(gifs/giphy.png)`;
					previousGif = "";
					nextGif = "";
					flag = true;
				}, 1000);
			}
			score += 1;
		}
	}

	document.getElementsByClassName("score")[0].innerText = "Score : "+score;
	localStorage.setItem("score", score);

	if (gifArray.length == GIF.length/2) {

		if (score < localStorage.getItem("bestScore")) {
			localStorage.setItem("bestScore", score);
		}

		youWin.textContent = "YOU WON";

		youWin.style.display = "block";
		youWin.style.border = "4px solid blue";
		youWin.style.alignSelf = "center";
		youWin.style.height = "100px";
		youWin.style.width = "300px";
		youWin.style.fontSize = "60px";
		youWin.style.color = "green";
		youWin.style.margin = "auto";
		youWin.style.marginTop = "20px";
		youWin.style.backgroundColor = "white";

		restartBtn.style.display = "block";
		restartBtn.style.margin = "auto";


	}
}


createDivForGif(shuffledGif);
gameContainer.style.display = "none";



startBtn.addEventListener("click", function () {
	startContainer.style.display = "none";
	gameContainer.style.display = "block";
	document.getElementById("score").style.visibility="visible";
});

restartBtn.addEventListener("click", function () {

	score = 0;
	previousGif = "";
	nextGif = "";
	flag = true;
	gifArray = [];

	youWin.style.display = "none";
	restartBtn.style.display = "none";

	let shuffledGif = shuffle(GIF);

	while (gameContainer.hasChildNodes()) {
		gameContainer.removeChild(gameContainer.firstChild);
	}
	createDivForGif(shuffledGif);

});