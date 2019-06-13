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
const pickedColors = [];
const startButton = document.querySelector("#start");
const redSquare  = document.querySelector("#red");
const blueSquare  = document.querySelector("#blue");
const greenSquare  = document.querySelector("#green");
const yellowSquare  = document.querySelector("#yellow");

const makeSquareSolid = (square, color) => {
	square.style.backgroundColor = color;
	setTimeout( ()=> {
		square.style.backgroundColor = "#f6f6f6";
	}, 500)
}

const pickRandomSquare = () => {
	let num = Math.floor(Math.random() * (4)) + 1;
	console.log(num)
	switch (num) {
		case 1:
			pickedColors.push("red")
			makeSquareSolid(redSquare, "#f22613");
			break
		case 2: 
			pickedColors.push("blue")
			makeSquareSolid(blueSquare, "#2980b9");
			break
		case 3: 
			pickedColors.push("green")
			makeSquareSolid(greenSquare, "#2ecc71");
			break
		case 4:
			pickedColors.push("yellow")
			makeSquareSolid(yellowSquare, "#f1c40f");
			break
	}
}

const checkIfUserInputIsCorrect = (event) => {
	console.log(event.target.id)
	if(event.target.id === pickedColors[0]) {
		alert("you win!")
	} else {
		alert("try again!")
	}
}

startButton.addEventListener("click", pickRandomSquare);

const tiles = document.querySelectorAll('.tile');

tiles.forEach( (tile) => {
	tile.addEventListener("click", checkIfUserInputIsCorrect);
})


