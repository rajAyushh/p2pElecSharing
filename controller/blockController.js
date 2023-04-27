const { Block } = require('../models/blocksModel')
const SHA256 = require("crypto-js/sha256");
const { MerkleTree } = require("merkletreejs");
const { Transaction } = require("../models/transactionModel");

exports.viewAllBlocks = async(req,res,next) => {
    result = await Block.find()
    result.length == 0
    ?  next(console.log("No Blocks were found..."))
    : res.status(200).json(result);
}

exports.addBlockDetails = async(req,res,next) => {
  let reqBody = req.body;
  if (typeof reqBody === "string") {
    reqBody = JSON.parse(reqBody);
  }
  reqBody.timestamp = Date.now();
  var noOfRows= await Block.count();
  reqBody.height = noOfRows+1;
  // txnArry=[];
  const lastSixTxnValues = [];
  await Transaction.find({}, { txnHash: 1 })
    .sort({ $natural: -1 })
    .limit(6)
    .then((docs) => {
      docs.forEach((doc) => {
        lastSixTxnValues.push(doc.txnHash);
      });
    })
    .catch((err) => {
      console.error(err);
      return;
    });
  const leaves = lastSixTxnValues.map((x) => SHA256(x).toString());
  const tree = new MerkleTree(leaves, SHA256);
  const root = tree.getRoot().toString("hex");
//   // Hash function used to build the tree
//   const hashFunction = crypto.createHash("sha256");

//   // Create a Merkle tree instance
//   const tree = new MerkleTree(lastSixTxnValues, hashFunction);

  reqBody.merkleRoot = root;
  reqBody.transactionArray = lastSixTxnValues;
  const docs = await Block.find({}, { currentHash: 1 })
    .sort({ $natural: -1 })
    .limit(2);

  if (docs && docs.length >= 2) {
    // Get the txnHash value of the second document in the array
    const prevTxnHash = docs[1].currentHash;
    console.log("Previous txnHash:", prevTxnHash);
    reqBody.previousHash = prevTxnHash;
  } else {
    console.error("Error: Query did not return at least two documents.");
  }
    var once = 0;
    if (reqBody.difficulty === undefined) {
      reqBody.difficulty = 1;
    }
    
    while (
      SHA256(
        reqBody.height +
            reqBody.timestamp +
            reqBody.previousHash +
            reqBody.merkleRoot +
            once
    ).toString().substring(0, reqBody.difficulty) !== Array(reqBody.difficulty + 1).join("0")
    ) {
      once++;
    }
    reqBody.nonce = once;
    reqBody.currentHash = SHA256(
      reqBody.height +
        reqBody.timestamp +
        reqBody.previousHash +
        reqBody.merkleRoot +
        reqBody.nonce
    ).toString();

//   Block.find().sort({ $natural: -1 }).limit(7);
  let details = new Block(reqBody);
  await details.save().then(() => {
    console.log("save data : ", details);
    res.status(201).end();
  });
}