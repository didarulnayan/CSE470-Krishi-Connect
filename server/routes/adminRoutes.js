const express = require('express');
const router = express.Router();
const { getAllUsers, getAllCrops } = require('../controllers/adminController');

// Route to get all registered users
router.get('/users', getAllUsers);

// Route to get all active crop listings
router.get('/crops', getAllCrops);

module.exports = router;
