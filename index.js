const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Guess the Number Game variables and functions
let maxTries = 6;
let minRange;
let maxRange;
let tries;
let guess;

const resetGame = () => {
  minRange = 1;
  maxRange = 100;
  tries = 0;
  guess = 1;
};

const setRange = () => maxRange - minRange + 1;

const updateGuess = () => {
  tries++;
  if (tries > maxTries) {
    console.log("Game over. You've used up all your tries.");
    playAgain();
    return;
  }
  guess = Math.ceil((minRange + maxRange) / 2);
};

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

const ask = (questionText) =>
  new Promise((resolve) => {
    rl.question(questionText, resolve);
  });

const startGuessTheNumber = async () => {
  resetGame();
  console.log(
    `Please think of a number between 1 and ${maxRange} (inclusive). The player which is you will think of a number and the computer will have 6 tries to guess the player's number they are thinking of in their head. When the computer guesses a number you will say yes(Y) or no(N), if the guess is no, then the computer will ask you, is your number Higher(H) or lower(L) than the number guessed and the game will continue until the number is guessed or the 6 guesses have been used up. If the game detects the player trying to cheat by changing their original secret number, then the game will end. Good Luck!`
  );
  updateGuess();

  while (true) {
    checkForWin();
    let yesNo = (
      await ask(
        `Is it... ${guess}? Just type the first letter of yes(Y) or No(N)? (Guesses left: ${
          maxTries - tries
        }) `
      )
    ).toUpperCase();

    if (yesNo === "N") {
      let highLow = (
        await ask(
          "Just Type the first letter of higher (H), or lower (L) based on your number? "
        )
      ).toUpperCase();

      if (highLow === "H") {
        if (guess >= maxRange) {
          console.log("No cheating! You said it was lower before.");
          playAgain();
          return;
        }
        minRange = guess + 1;
        updateGuess();
      } else if (highLow === "L") {
        if (guess <= minRange) {
          console.log("No cheating! You said it was higher before.");
          playAgain();
          return;
        }
        maxRange = guess - 1;
        updateGuess();
      } else {
        console.log("Please enter H/L");
      }
    } else if (yesNo === "Y") {
      console.log(`Your number was ${guess}!`);
      console.log(`I guessed it in ${tries} tries.`);
      playAgain();
      return;
    } else {
      console.log("Please enter Y/N");
    }
  }
};

const playAgain = () => {
  rl.question("Do you want to play again? (Yes/No) ", (answer) => {
    if (answer.toUpperCase() === "YES") {
      chooseGame();
    } else {
      rl.close();
    }
  });
};

// Reverse Guess the Number Game variables and functions
let maxAttempts = 7;
let attempts = 0;
let secretNumber;

function startReverseGuessTheNumber() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  console.log(
    "Welcome to Reverse Guess the Number. The computer will have a secret number the player has to try and guess. The secret number will be between 1 and 100. The player will have 6 tries to guess the secret number. Your guesses will be tracked, and if you run out of guesses, the game will end and you will be told game over!"
  );
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

const chooseGame = () => {
  rl.question(
    "Do you want to play Guess the Number (1) or Reverse Guess the Number (2)? ",
    (answer) => {
      if (answer === "1") {
        startGuessTheNumber();
      } else if (answer === "2") {
        startReverseGuessTheNumber();
      } else {
        console.log("Please enter 1 or 2.");
        chooseGame();
      }
    }
  );
};

// Start by choosing a game
chooseGame();
