/**
 * This is a game where the computer plays first,
 * then the user follows the sequence,
 * if user is wrong, the computer plays the sequence again
 * when strict mode is active, the game restarts on user's wrong button press
 */

// Once you have the game set up, you can optionally add these sounds:
// var audio = {
// 	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
// 	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), 
// 	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), 
// 	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
// };


// USER STORY: When I Click start, a square becomes solid color for a moment:
// start clicked -> random square becomes solid
// same square clicked -> end of round one

// USER STORY: When the user gets a round correct, the game repeats the previous pattern, with one more square added.


const computerPickedColors = [];
const userPickedColors     = [];
let   round = 0;
const startButton = document.querySelector("#start");

const makeSquareSolid = (color,) => {
	let squareObj = document.querySelector("#" + color)
	squareObj.style.backgroundColor = color;
	setTimeout( ()=> {
		squareObj.style.backgroundColor = "#f6f6f6";
	}, 500)
}

const displayPattern = () => {
	console.log(computerPickedColors)
	computerPickedColors.forEach( (color) => {
		setTimeout( () => {
			makeSquareSolid(color)
		}, 500)
	})
	userPickedColors.length = 0
}

const pickRandomSquare = () => {
	let num = Math.floor(Math.random() * (4)) + 1;
	switch (num) {
		case 1:
			computerPickedColors.push("red")
			break
		case 2: 
			computerPickedColors.push("blue")
			break
		case 3: 
			computerPickedColors.push("green")
			break
		case 4:
			computerPickedColors.push("yellow")
			break
	}
	displayPattern()
}

const checkIfUserInputIsCorrect = (event) => {
	if(userPickedColors.toString() == computerPickedColors.toString()) {
		round++;
		pickRandomSquare()
	} else {
		alert("try again!")
	}
}

startButton.addEventListener("click", pickRandomSquare);

const tiles = document.querySelectorAll('.tile');

tiles.forEach( (tile) => {
	tile.addEventListener("click", () => {
		userPickedColors.push(event.target.id)
		// if(userClicks === computerPickedColors.length) {
			checkIfUserInputIsCorrect
		// }
	});
})


