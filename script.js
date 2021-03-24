const gameContainer = document.getElementById("game");

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement("div");

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
let previous, next;
let winner = false;
let count = 0;
let previousColor = "";
let nextColor = "";
let flag = true;
let colorArray = [];
const colorCount = COLORS.length/2;

function handleCardClick(event) {
	// you can use event.target to see which element was clicked

	let color = event.target.classList.value;
	if (!colorArray.includes(color)) {
		if (previousColor.length == 0 && flag) {
			previousColor = color;
			previous = event;
			event.target.style.backgroundColor = color;
			count += 1;
		} else if (previous.target != event.target && flag) {
			if (color == previousColor) {
				colorArray.push(previousColor);
				event.target.style.backgroundColor = color;
				previousColor = "";
				previous = "";
			} else {
				flag = false;
				nextColor = color;
				next = event;
				event.target.style.backgroundColor = color;
				setTimeout(() => {
					previous.target.style.backgroundColor = "white";
					next.target.style.backgroundColor = "white";
					previousColor = "";
					nextColor = "";
					flag = true;
				}, 1000);
			}
			count += 1;
		}
	}

	if (colorArray.length == colorCount) {
		var winner = document.getElementById("winner");
		winner.textContent = "YOU WON";
    winner.style.border = "4px solid blue";
    winner.style.position = "absolute";
    winner.style.alignSelf="center";
    winner.style.margin = "50px";
    winner.style.height = "100px";
    winner.style.width = "300px";
    winner.style.fontSize = "60px";
		winner.style.color = "green";
    winner.style.backgroundColor = "white";
	}
}

// when the DOM loads
createDivForColors(shuffledColors);
