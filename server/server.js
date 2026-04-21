const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Connecting the Controller to the Server)
app.use('/api/crops', require('./routes/cropRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully to KrishiConnect cluster!'))
  .catch((err) => console.log('MongoDB connection failed:', err.message));

// Import and use routes
app.use('/api/crops', require('./routes/cropRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));