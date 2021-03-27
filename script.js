const gameContainer = document.getElementById("game");
const youWin = document.getElementById("winner");
const bestScore = document.getElementById("bestScore");
const startContainer = document.getElementById("start");

const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
const replay = document.getElementById("replay");
const soundBtn = document.getElementById("sound");

const click = new sound("sounds/click.mp3");
const match = new sound("sounds/match.mp3");
const win = new sound("sounds/tada.mp3");
const notMatch = new sound("sounds/notmatch.mp3");
const bgSound = new sound("sounds/bgsound.mp3");

bestScore.innerText = localStorage.getItem("bestScore") || 0;



if (!localStorage.getItem("sound")) {
	localStorage.setItem("sound", "True");
}
let replayFlag = false;

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
let timeCount = false;

const gifCount = GIF.length / 2;

function handleCardClick(event) {

	replay.src = "icons/replay.svg";
	replayFlag = true;

	click.play();
	let gif = event.target.classList.value;

	if (!gifArray.includes(gif)) {

		if (previousGif.length == 0 && flag) {
			event.target.style.transform = "rotateY(360deg)";
			event.target.style.boxShadow = "0 0 5px 10px #eeebdd";
			previousGif = gif;
			previous = event;
			event.target.style.backgroundImage = `url(gifs/${gif}.png)`;
			score += 1;

		} else if (previous.target != event.target && flag) {
			event.target.style.transform = "rotateY(360deg)";
			if (gif == previousGif) {
				match.play();
				gifArray.push(previousGif);
				event.target.style.backgroundImage = `url(gifs/${gif}.png)`;
				previousGif = "";
				previous.target.style.boxShadow = "0 0 5px 10px #59981A";
				previous = "";
				event.target.style.boxShadow = "0 0 5px 10px #59981A";
			} else {
				previous.target.style.boxShadow = "0 0 5px 10px #F51720";
				event.target.style.boxShadow = "0 0 5px 10px #F51720";
				flag = false;
				nextGif = gif;
				next = event;
				event.target.style.backgroundImage = `url(gifs/${gif}.png)`;
				window.navigator.vibrate(200);
				notMatch.play();
				setTimeout(() => {
					previous.target.style.transform = "rotateY(0deg)";
					event.target.style.transform = "rotateY(0deg)";

					previous.target.style.backgroundImage = `url(gifs/giphy.png)`;
					next.target.style.backgroundImage = `url(gifs/giphy.png)`;

					previous.target.style.boxShadow = "none";
					next.target.style.boxShadow = "none";
					previousGif = "";
					nextGif = "";
					flag = true;
				}, 1000);
			}
			score += 1;
		}
	}

	document.getElementsByClassName("score")[0].innerText = "Score : " + score;
	localStorage.setItem("score", score);

	if (gifArray.length == GIF.length / 2) {
		win.play();
		if (!localStorage.getItem("bestScore") || score < localStorage.getItem("bestScore")) {
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

	soundOnOff();

	document.getElementById("score").style.visibility = "visible";
	document.getElementById("control").style.visibility = "visible";
	if (timeCount == false) {
		timer();
	}

});

restartBtn.addEventListener("click", function () {
	restart();
});

replay.addEventListener("click", function () {
	if (replayFlag == false) {
		gameContainer.style.display = "none";
		startContainer.style.display = "block";
		document.getElementById("score").style.visibility = "hidden";
		document.getElementById("control").style.visibility = "hidden";
	} else {
		replay.src = "icons/back.svg";
		replayFlag = false;
		restart();
	}

});


function timer() {
	let timePassed = 0;
	timeCount = true;
	document.getElementById("timer").innerText = "Start in : 5sec";
	let timer = setInterval(() => {

		timePassed += 1;
		timeLeft = 5 - timePassed;
		document.getElementById("timer").innerText = "Start in : " + timeLeft + "sec";

		if (timeLeft == 0) {
			document.getElementById("timer").innerText = "";
			clearInterval(timer);
			timeCount = false;

		}
	}, 1000, 5);
	for (let gif of shuffledGif) {

		document.getElementsByClassName(gif)[0].style.backgroundImage = `url(gifs/${gif}.png)`;
		document.getElementsByClassName(gif)[1].style.backgroundImage = `url(gifs/${gif}.png)`;
	}
	setTimeout(() => {
		for (let gif of shuffledGif) {
			document.getElementsByClassName(gif)[0].addEventListener("click", handleCardClick);
			document.getElementsByClassName(gif)[1].addEventListener("click", handleCardClick);
			document.getElementsByClassName(gif)[0].style.backgroundImage = `url(gifs/giphy.png)`;
			document.getElementsByClassName(gif)[1].style.backgroundImage = `url(gifs/giphy.png)`;

		}
	}, 5000);
}

function restart() {
	score = 0;
	previousGif = "";
	nextGif = "";
	flag = true;
	gifArray = [];

	document.getElementsByClassName("score")[0].innerText = "Score : " + score;
	youWin.style.display = "none";
	restartBtn.style.display = "none";

	let shuffledGif = shuffle(GIF);

	while (gameContainer.hasChildNodes()) {

		gameContainer.removeChild(gameContainer.firstChild);
	}
	createDivForGif(shuffledGif);
	if (timeCount == false) {
		timer();
	}
}

//sound
function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function () {
		this.sound.play();
	};
	this.stop = function () {
		this.sound.pause();
	};
	this.loopPlay = function () {
		this.sound.play();
		this.sound.loop = true;
	};
}

function soundOnOff() {
	if (localStorage.getItem("sound") == "True") {
		bgSound.loopPlay();
	} else {
		bgSound.stop();
	}
}

function soundButton() {
	if (localStorage.getItem("sound") == "True") {
		soundBtn.src = "icons/sound.svg";
	} else {
		soundBtn.src = "icons/soundCancel.svg";
	}
}

soundButton();
soundBtn.addEventListener("click", function () {

	if (localStorage.getItem("sound") == "False") {
		localStorage.setItem("sound", "True");
		soundButton();
	} else {
		localStorage.setItem("sound", "False");
		soundButton();
	}
	soundOnOff();
});