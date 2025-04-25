const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const PORT = process.env.PORT || 8181;

// Connect to MongoDB
connectToMongo();

// Use EJS if you plan on rendering views (optional)
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ✅ Relaxed CORS config for development
app.use(cors({
  origin: '*',         // Allow ALL origins for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
