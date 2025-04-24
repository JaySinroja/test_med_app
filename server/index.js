const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8181;

// ✅ Fix CORS to allow React frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Allow React dev server
  credentials: true                 // Allow cookies/headers if needed
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
