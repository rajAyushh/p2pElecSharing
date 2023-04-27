const mongoose = require("mongoose");
const db = "mongodb+srv://Ayush:Raju%40123@bcinsg.6i8nggm.mongodb.net/test";
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
