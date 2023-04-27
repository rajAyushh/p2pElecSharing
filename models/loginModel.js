const mongoose = require("mongoose");
const Joi = require("joi");

var Schema = mongoose.Schema;

var loginSchema = new Schema(
  {
    publicKey: {
      type: mongoose.Schema.Types.String,
    },
    privateKeyHash: {
      type: mongoose.Schema.Types.String,
    },
    wallet: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    latitude: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    longitude: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    currConsumption: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    currProduction: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    }
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
