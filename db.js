const mongoose = require("mongoose");
const db =
  "mongodb+srv://Raju:1ilmXbwwk5UPXCxR@financialproblem.l7dtsdc.mongodb.net/test";
async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Atlas connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
