const { Lending } = require("../models/lendingModel");

exports.viewAllLendingDetails = async (req, res, next) => {
  result = await Lending.find();
  result.length == 0
    ? next(console.log("No Lending Details were found..."))
    : res.status(200).json(result);
};

exports.addLendingDetails = async (req, res, next) => {
  let details = new Lending(req.body);
  await details.save().then(() => {
    console.log("save data : ", details);
    res.status(201).end();
  });
};
