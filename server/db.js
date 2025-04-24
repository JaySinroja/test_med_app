const mongoose = require("mongoose");

// Replace this with your actual connection string
const mongoURI = "mongodb+srv://jaysinroja12:jay1210@cluster0.vdtmgil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectToMongo;
