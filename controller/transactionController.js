const { Transaction } = require("../models/transactionModel");
const SHA256 = require("crypto-js/sha256");

exports.viewAllTransactionDetails = async (req, res, next) => {
  result = await Transaction.find();
  result.length == 0
    ? next(console.log("No Transaction Details were found..."))
    : res.status(200).json(result);
};

exports.addTransactionDetails = async (req, res, next) => {
  let reqBody = req.body;
  if (typeof reqBody === "string") {
    reqBody = JSON.parse(reqBody);
  }
  reqBody.timestamp = Date.now();
  var noOfRows= await Transaction.count();
  reqBody.txnId = noOfRows+1;
  // reqBody.txnId = Transaction.count()+1;
  // reqBody.txnId = 3;
  reqBody.txnHash = SHA256(
    reqBody.sender +
      "sent" +
      reqBody.recipient +
      +reqBody.quantity +
      "rupeeCOIN at" +
      reqBody.interestRate +
      "on" +
      reqBody.timestamp +
      "with txnId" +
      reqBody.txnId
  ).toString();

  let details = new Transaction(reqBody);

  await details.save().then(() => {
    console.log("save data : ", details);
    res.status(201).end();
  });
};
exports.countTransaction = async (req, res, next) => {
  result = await Transaction.count();
  result.length == 0
    ? next(console.log("No Transaction Details were found..."))
    : res.status(200).json(result);
};