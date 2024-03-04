// const readline = require("readline");
// const rl = readline.createInterface(process.stdin, process.stdout);

// function ask(questionText) {
//   return new Promise((resolve, reject) => {
//     rl.question(questionText, resolve);
//   });
// }

// async function start() {
//   console.log(
//     "Let's play a game where you (human) make up a number and I (computer) try to guess it."
//   );
//   let secretNumber = await ask(
//     "What is your secret number?\nI won't peek, I promise...\n"
//   );
//   console.log("You entered: " + secretNumber);
//   // Now try and complete the program.
//   process.exit();
// }

// start();

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startGameMenu() {
  console.log("Welcome! Choose a game:");
  console.log("1. Guess The Number");
  console.log("2. Reverse Guess The Number Game");
  rl.question("Enter the number of the game you want to play: ", (answer) => {
    if (answer === "1") {
      const game1 = require("./game1");
    } else if (answer === "2") {
      const game2 = require("./game2");
    } else {
      console.log("Invalid input. Please enter 1 or 2.");
      startGameMenu();
    }
  });
}

startGameMenu();
