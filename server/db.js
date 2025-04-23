const mongoose = require("mongoose");

// Replace this with your actual connection string
const mongoURI = "mongodb+srv://jaysinroja12:jay1210@cluster0.vdtmgil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
