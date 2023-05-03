const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(prompt) {
    return new Promise((resolve, reject) => {
        rl.question(prompt, (input) => {
        resolve(input);
        });
    });
    }

