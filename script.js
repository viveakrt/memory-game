const gameContainer = document.getElementById("game");
const restartBtn = document.getElementById("restart-btn");
const youWin = document.getElementById("winner");
const bestScore = document.getElementById("bestScore");
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start");

bestScore.innerText = localStorage.getItem("bestScore") || 0;

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

const gifCount = GIF.length / 2;

function handleCardClick(event) {

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

		if (!localStorage.getItem("bestScore") || score < localStorage.getItem("bestScore") ) {
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

	document.getElementById("score").style.visibility = "visible";
	document.getElementById("timer").style.visibility = "visible";

	timer();
});

restartBtn.addEventListener("click", function () {

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
	timer();
});


function timer(){
	let timePassed = 0;

	let timer = setInterval(()=>{
		document.getElementsByTagName("div").
		timePassed = timePassed += 1;
		timeLeft = 5 - timePassed;
		document.getElementById("timer").innerText = "Start in : "+timeLeft+"sec";

		if(timeLeft<0){

			document.getElementById("timer").innerText = "";
			clearInterval(timer);
		}
	},1000);
	for (let gif of shuffledGif){

		document.getElementsByClassName(gif)[0].style.backgroundImage=  `url(gifs/${gif}.png)`;
		document.getElementsByClassName(gif)[1].style.backgroundImage=  `url(gifs/${gif}.png)`;
	}
	setTimeout(()=>{
		for (let gif of shuffledGif){
			document.getElementsByClassName(gif)[0].addEventListener("click", handleCardClick);
			document.getElementsByClassName(gif)[1].addEventListener("click", handleCardClick);
			document.getElementsByClassName(gif)[0].style.backgroundImage=  `url(gifs/giphy.png)`;
			document.getElementsByClassName(gif)[1].style.backgroundImage=  `url(gifs/giphy.png)`;
		}
	},5000);
}