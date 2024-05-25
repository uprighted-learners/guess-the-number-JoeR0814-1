const readline = require("readline");
// this will allow the user to input their answers
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let maxTries = 6;
let minRange;
let maxRange;
let tries;
let guess;

//
const resetGame = () => {
  minRange = 1;
  maxRange = 100;
  tries = 0;
  guess = 1;
};
// this will start the game as well as the secret number
const setRange = () => maxRange - minRange + 1;

// this will update the computer's guess and the number of tries the computer has to guess the number
const updateGuess = () => {
  tries++;
  if (tries > maxTries) {
    console.log("Game over. You've used up all your tries.");
    playAgain();
    return;
  }
  guess = Math.ceil((minRange + maxRange) / 2);
};

// this will check if the computer guessed the number or if the player is cheating and if the player is cheating then the game will end and the player will be told game over and if the computer guesses the number then the computer will tell the player that the computer guessed the number and how many tries it took to guess the number
const checkForWin = () => {
  if (setRange() === 1) {
    console.log(`It is ${guess}!`);
    console.log(`I guessed it in ${tries} tries.`);
    playAgain();
  } else if (setRange() === 2) {
    console.log(`It is ${guess + 1}!`);
    console.log(`I guessed it in ${tries} tries.`);
    playAgain();
  }
};

// this will allow the user to input their answers and the computer will wait for the user to input their answers
const ask = (questionText) =>
  new Promise((resolve) => {
    readlineInterface.question(questionText, resolve);
  });

// this will start the game and the computer will ask the player to think of a number between 1 and 100 and the computer will try to guess the number the player is thinking of and the computer will ask the player if the number the computer guessed is the number the player is thinking of and if the player says no then the computer will ask the player if the number the player is thinking of is higher or lower than the number the computer guessed and the game will continue until the computer guesses the number or the player says no to the computer's guess
const start = async () => {
  resetGame();
  console.log(
    `Please think of a number between 1 and ${maxRange} (inclusive). The player which is you will think of a number and the computer will have 6 tries to guess the players number they are thinking of in their head. When the computer guesses a number you will say yes(Y) or no(N), if the guess is no, then the computer will ask you, is your number Higher(H) or lower(L) than the number guessed and the game will continue until the number is guessed or the 6 guesses have been used up, if the game detects the player trying to cheating by changing their original secret number then the game will end. Good Luck!`
  );
  updateGuess();

  // this will keep the game going until the computer guesses the number or the player says no to the computer's guess  and the computer will ask if the number is higher or lower than the number the player is thinking of and the game will continue until the computer guesses the number or the player says no to the computer's guess
  while (true) {
    checkForWin();
    let yesNo = (
      await ask(
        `Is it... ${guess}? Just type the first letter of yes(Y) or No(N)?s(Guesses left: ${
          maxTries - tries
        }) `
      )
    ).toUpperCase();
    // this will check if the player is cheating by changing their original secret number
    if (yesNo === "N") {
      let highLow = (
        await ask(
          "Just Type the first letter of higher (H), or lower (L) based on your number? "
        )
      ).toUpperCase();
      // this will check if the player is cheating by changing their original secret number
      if (highLow === "H") {
        if (guess >= maxRange) {
          console.log("No cheating! You said it was lower before.");
          playAgain();
          return;
        }
        // this will update the computer's guess
        minRange = guess + 1;
        updateGuess();
      } else if (highLow === "L") {
        // this will check if the player is cheating by changing their original secret number
        if (guess <= minRange) {
          console.log("No cheating! You said it was higher before.");
          playAgain();
          return;
        }
        // this will update the computer's guess
        maxRange = guess - 1;
        updateGuess();
      } else {
        console.log("Please enter H/L");
      }
      // this will check if the computer guessed the number the player is thinking of
    } else if (yesNo === "Yes") {
      console.log(`Your number was ${guess}!`);
      console.log(`I guessed it in ${tries} tries.`);
      playAgain();
      return;
    } else {
      console.log("Please enter Y/N");
    }
  }
};

// this will allow the user to play again if they type yes or no for game over when they ended the game and if they type yes then the game will start again
const playAgain = () => {
  readlineInterface.question(
    "Do you want to play again? (Yes/No) ",
    (answer) => {
      if (answer.toUpperCase() === "Yes") {
        start();
      } else {
        readlineInterface.close();
      }
    }
  );
};

resetGame();
start();
