const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Middleware: CORS allows our React frontend to talk to this backend
app.use(cors());
// Middleware: express.json allows us to read JSON data from the request body
app.use(express.json());

// ==========================================
// MVC ARCHITECTURE: ROUTES (The Traffic Cops)
// ==========================================
// These routes intercept URL requests and send them to the correct Controller logic.
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Database Connection
// We moved the MongoDB connection logic to config/db.js to keep server.js clean!
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));