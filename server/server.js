const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware so Express understands JSON data
app.use(express.json());
app.use(cors());

// Add this line to connect your routes!
app.use('/api/crops', require('./routes/cropRoutes'));

// A simple test route
app.get('/', (req, res) => {
  res.send('Krishi-Connect API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});