const gameContainer = document.getElementById("game");
const restartBtn = document.getElementById("restart-btn");
const youWin = document.getElementById("winner");
const bestScore = document.getElementById("bestScore");


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

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledGif = shuffle(GIF);

function createDivForGif(gifArray) {

	let count = 0;

	for (let gif of gifArray) {
		count += 1;
		const newDiv = document.createElement("div");
		newDiv.classList.add(gif);
		newDiv.addEventListener("click", handleCardClick);
		gameContainer.append(newDiv);

		if (count == GIF.length / 2) {
			const newDiv = document.createElement("h1");
			newDiv.innerText = 0;
			newDiv.classList.add("score");
			gameContainer.append(newDiv);
		}
	}
}

// TODO: Implement this function!



let previous, next;
let count = 0;
let previousGif = "";
let nextGif = "";
let flag = true;
let gifArray = [];

const gifCount = GIF.length / 2;

function handleCardClick(event) {
	// you can use event.target to see which element was clicked


	let gif = event.target.classList.value;

	if (!gifArray.includes(gif)) {

		if (previousGif.length == 0 && flag) {
			previousGif = gif;
			previous = event;
			event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;
			count += 1;

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
					previous.target.style.backgroundImage = `url(gifs/giphy.webp)`;
					next.target.style.backgroundImage = `url(gifs/giphy.webp)`;
					previousGif = "";
					nextGif = "";
					flag = true;
				}, 1000);
			}
			count += 1;
		}
	}

	document.getElementsByClassName("score")[0].innerText = count;
	localStorage.setItem("score", count);
	if (gifArray.length == GIF.length/2) {

		if (count < localStorage.getItem("bestScore")) {
			localStorage.setItem("bestScore", count);
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

// when the DOM loads
createDivForGif(shuffledGif);
gameContainer.style.display = "none";


//Start
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start");
bestScore.innerText = localStorage.getItem("bestScore");



startBtn.addEventListener("click", function () {
	startContainer.style.display = "none";
	gameContainer.style.display = "block";
});

restartBtn.addEventListener("click", function () {

	count = 0;
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