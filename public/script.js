const gameContainer = document.getElementById("game");
const youWin = document.getElementById("winner");
const userEmail = document.getElementById("email");
const userName = document.getElementById("username");
const bestScoreInput = document.getElementById("bestScoreInput");
const bestScore = document.getElementById("bestScore");
const startContainer = document.getElementById("start");
const scoreFinal = document.getElementById("score");

const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const replay = document.getElementById("replay");
const soundBtn = document.getElementById("sound");

const notEmptyUser = document.getElementById("not-empty-user");



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
	
	if (gifArray.length== GIF.length/2 ) {
		gameContainer.style.display = "none";
		document.getElementById("scoreinput").value = Number(score);
		win.play();
		if (!localStorage.getItem("bestScore") || score < localStorage.getItem("bestScore")) {
			localStorage.setItem("bestScore", score);
		}
		bestScoreInput.value = localStorage.getItem("bestScore") || 0;
		userName.style.display = "block";
		userName.style.visibility = "visible";
		userName.style.margin = "auto";
		userName.style.marginBottom = "1em";

		userEmail.style.display = "block";
		userEmail.style.visibility = "visible";
		userEmail.style.margin = "auto";
		userEmail.style.marginBottom = "1em";

		
		
		youWin.textContent = "YOU WON";

		youWin.style.display = "block";
		youWin.style.border = "1px solid #cc561e";
		youWin.style.alignSelf = "center";
		youWin.style.height = "100px";
		youWin.style.width = "300px";
		youWin.style.borderRadius = "30px";
		youWin.style.fontSize = "60px";
		youWin.style.color = "#eeebdd";
		youWin.style.margin = "auto";
		youWin.style.marginBottom = "1em";
		youWin.style.marginTop = "20px";
		youWin.style.backgroundColor = "#aa2b1d";
		
		restartBtn.style.display = "block";
		restartBtn.style.margin= "auto";
		
		submitBtn.style.display = "block";
		submitBtn.style.margin = "auto";

		
		
	}
}


createDivForGif(shuffledGif);
gameContainer.style.display = "none";
userEmail.style.display = "none";
userName.style.display = "none";


startBtn.addEventListener("click", function () {

		startContainer.style.display = "none";
		gameContainer.style.display = "block";
		
		soundOnOff();
		
	
		scoreFinal.style.visibility = "visible";
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
		scoreFinal.style.visibility = "hidden";
		gameContainer.style.display = "none";
		startContainer.style.display = "flex";

		userEmail.style.visibility = "hidden";
		userName.style.visibility = "hidden";
		scoreFinal.style.visibility = "hidden";
		document.getElementById("result").style.visibility = "none";
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
		document.getElementsByClassName(gif)[0].removeEventListener("click", handleCardClick);
		document.getElementsByClassName(gif)[1].removeEventListener("click", handleCardClick);
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
	fetchApi();
	gameContainer.style.display = "flex";
	document.getElementsByClassName("score")[0].innerText = "Score : " + score;
	youWin.style.display = "none";
	userEmail.style.display = "none";
	userName.style.display = "none";
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
const bestScore1 = document.getElementById("bestScore1");
const bestScore2 = document.getElementById("bestScore2");
const bestScore3 = document.getElementById("bestScore3");
const bestScore4 = document.getElementById("bestScore4");

const name0 = document.getElementById("name");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const name4 = document.getElementById("name4");

const mail = document.getElementById("mail");
const mail1 = document.getElementById("mail1");
const mail2 = document.getElementById("mail2");
const mail3 = document.getElementById("mail3");
const mail4 = document.getElementById("mail4");

function fetchApi(){

fetch('./user')
    .then(res => res.json())
    .then(top5users => {
		bestScore.innerText = top5users[0].score;
		bestScore1.innerText = top5users[1].score;
		bestScore2.innerText = top5users[2].score;
		bestScore3.innerText = top5users[3].score;
		bestScore4.innerText = top5users[4].score;

		name0.innerText = top5users[0].name;
		name1.innerText = top5users[1].name;
		name2.innerText = top5users[2].name;
		name3.innerText = top5users[3].name;
		name4.innerText = top5users[4].name;

		mail.innerText = timeFormate(top5users[0].createdAt);
		mail1.innerText = timeFormate(top5users[1].createdAt);
		mail2.innerText = timeFormate(top5users[2].createdAt);
		mail3.innerText = timeFormate(top5users[3].createdAt);
		mail4.innerText = timeFormate(top5users[4].createdAt);
		
		console.log(top5users);
	});

	
}
fetchApi();

function timeFormate(str){
	return (str.slice(0,10)+'/'+str.slice(11,19));
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

