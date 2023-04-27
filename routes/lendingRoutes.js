const express = require("express");
const router = express.Router();
const lendingController = require("../controller/lendingController");

router.get("/", lendingController.viewAllLendingDetails);

// router.get("/:_id", bookController.viewBookByID);

router.post("/", lendingController.addLendingDetails);

module.exports = router;
