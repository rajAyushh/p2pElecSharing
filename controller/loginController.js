const { Login } = require("../models/loginModel");
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

// a function to add login details to the database using the function defined in app.js
exports.addLoginDetails = async (req, res, next) => {
  let details = new Login(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    // res.status(201).end()
  });
};

exports.updateLoginDetails = async (req, res, next) => {
  let details = new Login(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    // res.status(201).end()
  });
};

exports.deleteLoginDetails = async (req, res, next) => {
  let details = new Login(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    // res.status(201).end()
  });
};

exports.viewLoginDetails = async (req, res, next) => {
  let details = new Login(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    // res.status(201).end()
  });
};
