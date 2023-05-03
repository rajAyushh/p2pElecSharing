const { Login } = require("../models/loginModel");
const readline = require("readline");
const crypto = require("crypto");

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

exports.viewAllLoginDetails = async (req, res, next) => {
  result = await Login.find();
  result.length == 0
    ? next(console.log("No Login Details were found..."))
    : res.status(200).json(result);
};

exports.addLoginDetails = async (req, res, next) => {
  let details = new Login(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    // res.status(201).end()
  });
};
exports.addLoginDetailsUsingTerm = async (req, res, next) => {
  const longitude = await askQuestion("Enter the longitude: ");
  const latitude = await askQuestion("Enter the latitude: ");
  const currConsumption = await askQuestion("Enter the current consumption: ");
  const currProduction = await askQuestion("Enter the current production: ");
  const wallet = await askQuestion("Enter the wallet amount: ");

  const details = new Login({
    longitude,
    latitude,
    currConsumption,
    currProduction,
    wallet,
  });

  try {
    const savedDetails = await details.save();
    console.log("save data : ", savedDetails);
    // res.status(201).json(savedDetails);
  } catch (err) {
    console.error(err);
    // res.status(500).json({ error: "Failed to save login details" });
  }
};
//update login details using function passed in app.js
exports.updateDeficitLoginDetails = async (req, res, next) => {
  const publicKey = await askQuestion("Enter the public key: ");
  const privateKey = await askQuestion("Enter the private key: ");
  const newcurrConsumption = await askQuestion(
    "Enter the current consumption: "
  );
  const login = await Login.findOne({ publicKey: publicKey });
  if (!login) {
    console.log("No such user exists");
    return;
  }
  if (login.currConsumption > newcurrConsumption) {
    console.log("You have entered wrong consumption");
    return;
  }
  const newWallet =
    login.wallet -
    2 * (newcurrConsumption - login.currConsumption);
  await console.log(
    "Smart Contract has blocked the COINS from your wallet: ",
    login.wallet - newWallet
  );
  // wait for 5 seconds
    console.log("Finding the nearest neighbour to cater your deficit...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Nearest neighbour found");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const hashKey=publicKey+newWallet;
    console.log("Energy is being transferred from publicKey: ", crypto.createHash('sha256').update(hashKey).digest('hex').substring(0, 32));
    await new Promise((resolve) => setTimeout(resolve, 3000));
  //update the currConsumption and wallet of user with public key
  await Login.updateOne(
    { publicKey: publicKey },
    { currConsumption: newcurrConsumption, wallet: newWallet }
  )
    .then((result) => {
      console.log(result);
      // Handle success
    })
    .catch((err) => {
      console.error(err);
      // Handle error
    });
};
