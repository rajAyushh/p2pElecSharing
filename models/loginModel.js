const mongoose = require("mongoose");
const Joi = require("joi");
const crypto = require("crypto");

var Schema = mongoose.Schema;

function randomFloatBetween(min, max) {
  return Math.random() * (max - min) + min;
}
function generateKeyPair() {
  const keyLength = 10;

  const algorithm = "aes-128-cbc";

  const privateKey = crypto.randomBytes(keyLength).toString("hex");
  const publicKey = crypto
    .createCipher(algorithm, privateKey)
    .final()
    .toString("hex");

  console.log("Generated key pair:", { publicKey, privateKey });

  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
}

// initialize schema for login to make this see if not default initialize values if add request json file contains that field
var loginSchema = new Schema(
  {
    publicKey: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    privateKeyHash: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    wallet: {
      type: mongoose.Schema.Types.Number,
      default: 100,
    },
    latitude: {
      type: mongoose.Schema.Types.Number,
      default: randomFloatBetween(16, 18),
    },
    longitude: {
      type: mongoose.Schema.Types.Number,
      default: randomFloatBetween(76, 78),
    },
    currConsumption: {
      type: mongoose.Schema.Types.Number,
      default: randomFloatBetween(10, 100),
    },
    currProduction: {
      type: mongoose.Schema.Types.Number,
      default: randomFloatBetween(0, 20),
    },
  },
  { collection: "login" }
);

loginSchema.pre("save", function (next) {
  console.log("Saving document with new key pair...");
  const keyPair = generateKeyPair();
  this.publicKey = keyPair.publicKey;
  this.privateKeyHash = keyPair.privateKey;
  next();
});

const Login = mongoose.model("Login", loginSchema);

module.exports = { Login };
