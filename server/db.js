const mongoose = require("mongoose");

async function connectDB(mongo_uri) {
  try {
    if (!mongo_uri) throw new Error("Provide a valid uri");

    const conn = await mongoose.connect(mongo_uri);

    console.log(`MongoDB connected to ${conn.connection.host}`);
  } catch (error) {
    console.log("db-error", error);
  }
}

module.exports = connectDB;
