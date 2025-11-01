const mongoose = require("mongoose");


const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};


module.exports = connect