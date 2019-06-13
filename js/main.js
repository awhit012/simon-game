/**
 * This is a game where the computer plays first,
 * then the user follows the sequence,
 * if user is wrong, the computer plays the sequence again
 * when strict mode is active, the game restarts on user's wrong button press
 */

const audio = {
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"), 
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"), 
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

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

const endRound = () => {
	round++;
	countSpan.innerHTML = round;
	if(round === 9) {
		alert("YOU WIN!")
		resetGame()
	} else {
		setTimeout( pickRandomSquare, 1000)
	}
}

const isUserInputCorrect = (event) => {
	return event.target.id === computerPickedColors[userClicks -1]
}

const isInFreeMode = () => {
	return computerPickedColors.length === 0
}

const isRoundOver = () => {
	return userClicks === computerPickedColors.length
}

const handleIncorrectUserInput = () => {
	if(isInFreeMode) {
		return;
	} else {
		alert("try again!")
		resetGame()
	}
}

const handleUserClick = (event) => {
	userClicks++;
	audio[event.target.id].play();
	makeSquareSolid(event.target.id)

	if(!isUserInputCorrect(event)) {
		handleIncorrectUserInput()
	}
	if (isRoundOver()) {
		endRound();
	}
}



startButton.addEventListener("click", () => {
	resetGame()
	pickRandomSquare();
});

const tiles = document.querySelectorAll('.tile');

tiles.forEach( (tile) => {
	tile.addEventListener("click", (event) => {
		handleUserClick(event)
	});
})


