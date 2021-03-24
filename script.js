const gameContainer = document.getElementById("game");

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
  
  for (let gif of gifArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(gif);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let previous, next;
let winner = false;
let count = 0;
let previousGif = "";
let nextGif = "";
let flag = true;
let gifArray = [];
const gifCount = GIF.length / 2;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  let gif = event.target.classList.value;
  console.log(gif);
  if (!gifArray.includes(gif)) {
    if (previousGif.length == 0 && flag) {
      previousGif = gif;
      previous = event;
      event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;
      count += 1;
      
    } 
    else if (previous.target != event.target && flag) {

      if (gif == previousGif) {
        gifArray.push(previousGif);
        event.target.style.backgroundImage = `url(gifs/${gif}.gif)`;
        previousGif = "";
        previous = "";

      } 
      else {
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

  if (gifArray.length == gifCount) {
    var winner = document.getElementById("winner");
    winner.textContent = "YOU WON";
    winner.style.border = "4px solid blue";
    winner.style.position = "absolute";
    winner.style.alignSelf = "center";
    winner.style.margin = "50px";
    winner.style.height = "100px";
    winner.style.width = "300px";
    winner.style.fontSize = "60px";
    winner.style.color = "green";
    winner.style.backgroundColor = "white";
  }
}

// when the DOM loads
createDivForGif(shuffledGif);
gameContainer.style.display = "none";

//Start
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start");

startBtn.addEventListener("click", function () {
  startContainer.style.display = "none";
  gameContainer.style.display = "block";
});