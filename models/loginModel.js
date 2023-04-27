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

  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
}

var keyPair = generateKeyPair();

var loginSchema = new Schema(
  {
    publicKey: {
      type: mongoose.Schema.Types.String,
      default: keyPair.publicKey,
    },
    privateKeyHash: {
      type: mongoose.Schema.Types.String,
      default: keyPair.privateKey,
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

const Login = mongoose.model("Login", loginSchema);

// function validateBook(Login) {
//   const schema = Joi.object({
//     author: Joi.string(),
//     name: Joi.name(),
//     bookId: Joi.any(),
//   }).options({ abortEarly: false });
//   return schema.validate(Login);
// }

module.exports = { Login };
