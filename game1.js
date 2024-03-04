const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let maxAttempts = 7;
let attempts = 0;
let secretNumber;

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  console.log("Welcome to the Guess the Number game!");
  askForGuess();
}

function askForGuess() {
  rl.question("Guess a number between 1 and 100: ", (userInput) => {
    const userGuess = parseInt(userInput);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      console.log("Please enter a valid number between 1 and 100.");
      askForGuess();
    } else {
      attempts++;
      console.log(`You have ${maxAttempts - attempts} guesses left.`);
      checkGuess(userGuess);
    }
  });
}

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
