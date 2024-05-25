const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// how many tries the get
let maxAttempts = 7;
let attempts = 0;

// this will start the game as well as the secret number
function startGame() {
  // the secret number that will generate
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  console.log(
    "Welcome to Reverse Guess the Number. The computer will have a secret number the player has to try and guess, the secret number will be between 1 and 100, the player will have 6 tries to guess the secret number your guesses will be tracked and if you run out of guesses the game will End and you will be told game over!"
  );
  askForGuess();
}

// this will as the user to guess a number they think it is when the game starts
function askForGuess() {
  rl.question("Guess a number between 1 and 100: ", (userInput) => {
    const userGuess = parseInt(userInput);

    // if the user types something that isn't a number or is lower than number 1 or higher than 100, the computer will tell the user to print a valid number between 1 and 100
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      console.log("Please enter a valid number between 1 and 100.");
      askForGuess();
    } else {
      // this is keeping track of the user's guesses
      attempts++;
      console.log(`You have ${maxAttempts - attempts} guesses left.`);
      checkGuess(userGuess);
    }
  });
}

// this function is to set the users attempts or if they guess correctly or if they guessed to high or to low
function checkGuess(userGuess) {
  if (attempts === maxAttempts) {
    console.log("You're out of guesses! Game over.");
    playAgain();
  } else if (userGuess === secretNumber) {
    console.log("Congratulations! You guessed the correct number!");
    playAgain();
  } else if (userGuess < secretNumber) {
    console.log("Too low, try again.");
    askForGuess();
  } else {
    console.log("Too high, try again.");
    askForGuess();
  }
}

// this function will allow the user to play again if they type yes or no for game over when they ended the game
function playAgain() {
  rl.question("Do you want to play again? (yes/no): ", (answer) => {
    if (answer.toLowerCase().trim() === "yes") {
      startGame();
    } else {
      console.log("Thank you for playing! Goodbye.");
      rl.close();
    }
  });
}

startGame();
