const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://<jaysinroja12>:<jay1210>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  