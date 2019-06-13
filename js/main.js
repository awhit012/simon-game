/**
 * This is a game where the computer plays first,
 * then the user follows the sequence,
 * if user is wrong, the computer plays the sequence again
 * when strict mode is active, the game restarts on user's wrong button press
 */

// Once you have the game set up, you can optionally add these sounds:
var audio = {
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), 
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), 
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};


// USER STORY: When I Click start, a square becomes solid color for a moment:
// start clicked -> random square becomes solid
// same square clicked -> end of round one

// USER STORY: When the user gets a round correct, the game repeats the previous pattern, with one more square added.
// issue: we want to check that a user has gotten each click correct as we go, not wait to the end.

// Pseudo code:
// on click from user
//    check if the button clicked is the correct one in the array
//    if button clicked isn't correct
//		show "try again"
//      end game
//	  if button clicked IS correct
//       continue checking until all clicks have been checked
//    	 when we have checked all clicks and they are all correct 
//         if rounds = 9
//            show "you win!"
//         else go to next round



const computerPickedColors = [];
let userClicks = 0;
let   round = 0;
const startButton = document.querySelector("#start");
const countSpan = document.querySelector("#count");

const makeSquareSolid = (color) => {
	let squareObj = document.querySelector("#" + color)
	squareObj.style.backgroundColor = color;
	setTimeout( ()=> {
		squareObj.style.backgroundColor = "#f6f6f6";
		console.log("making square solid")
	}, 500)
}

const displayPattern = () => {
	let i = 0
	let interval = setInterval( () => {
		makeSquareSolid(computerPickedColors[i])
		audio[computerPickedColors[i]].play();
		i++;
		if(i === computerPickedColors.length) {
			clearInterval(interval)
		}
	}, 500)
	userClicks = 0;
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

const resetGame = () => {
	computerPickedColors.length = 0;
	round = 0;
	countSpan.innerHTML = round;
}

const checkIfUserInputIsCorrect = (event) => {
	userClicks++;
	if (event.target.id === computerPickedColors[userClicks -1]) {
		console.log("correct")
	} else {
		if(computerPickedColors.length === 0) {
			return;
		}
		alert("try again!")
		resetGame()
	}

	if (userClicks === computerPickedColors.length) {
		console.log("end of round")
		round++;
		countSpan.innerHTML = round;
		if(round === 9) {
			alert("YOU WIN!")
			resetGame()
		} else {
			setTimeout( pickRandomSquare, 1000)
		}
	}
}

startButton.addEventListener("click", () => {
	resetGame()
	pickRandomSquare();
});

const tiles = document.querySelectorAll('.tile');

tiles.forEach( (tile) => {
	tile.addEventListener("click", (event) => {
		audio[event.target.id].play();
		makeSquareSolid(event.target.id)
		checkIfUserInputIsCorrect(event)
	});
})


