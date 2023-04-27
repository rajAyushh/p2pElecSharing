const mongoose = require("mongoose");
const Joi = require("joi");

var Schema = mongoose.Schema;

var lendingSchema = new Schema(
  {
    publicKey: {
      type: mongoose.Schema.Types.String,
    },
    Amount: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    Duration: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    InterestRate: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  { collection: "lending" }
);

const Lending = mongoose.model("Lending", lendingSchema);

// function validateBook(Login) {
//   const schema = Joi.object({
//     author: Joi.string(),
//     name: Joi.name(),
//     bookId: Joi.any(),
//   }).options({ abortEarly: false });
//   return schema.validate(Login);
// }

module.exports = { Lending };
