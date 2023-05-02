const port = 8080;

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const { connect } = require("./start/router");
const gridPeakPrice = 4;
const peerPeekPrice = 3;
const gridOffPeakPrice = 2;
const peerOffPeakPrice = 1;
const loginController = require("./controller/loginController");

console.log("Connecting to DB...");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./start/router"));

const server = app.listen(port, () => {
  console.log(`App is now running on port ${port}...`);
});

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(prompt) {
  return new Promise((resolve, reject) => {
    readline.question(prompt, (input) => {
      resolve(input);
    });
  });
}

setTimeout(() => {
  (async function () {
    while (true) {
      console.log(
        "1. Create new User\n2. Mine Block\n3. Report deficit\n4. Update Current Production\n5. Exit"
      );

      try {
        const num = await askQuestion("Enter the number: ");
        switch (num) {
          case "1":
            console.log("Create new User");
            //wait till the function completes execution
            await loginController.addLoginDetailsUsingTerm();
            continue;
          case "2":
            console.log("Mine Block");
            continue;
          case "3":
            console.log("Report deficit");
            continue;
          case "4":
            console.log("Update Current Production");
            continue;
          case "5":
            console.log("Exit");
            process.exit(0);
            break;
          default:
            console.log("Invalid Input");
            break;
        }
      } catch (err) {
        console.error(err);
      }
    }
  })();
}, 5000);
module.exports = server;
