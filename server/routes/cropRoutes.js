const express = require('express');
const router = express.Router();
const { addCrop, getFarmerCrops } = require('../controllers/cropController');

// ==========================================
// Requirement 1 - Khalid
// MVC ARCHITECTURE: ROUTER (The Traffic Cop)
// ==========================================
// These routes tell the server what Controller function to run when a specific URL is hit.

// Route to handle adding a crop (POST request because we are sending data)
router.post('/add', addCrop);

// Route to fetch crops for a specific farmer (GET request because we are just asking for data)
// The ':farmerName' is a dynamic parameter. Example: /api/crops/farmer/JohnDoe
router.get('/farmer/:farmerName', getFarmerCrops);

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

module.exports = router;