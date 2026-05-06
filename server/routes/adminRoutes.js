const express = require('express');
const router = express.Router();
const { getAllUsers, getAllCrops, deleteCropListing, removeUser } = require('../controllers/adminController');

// Route to get all registered users
router.get('/users', getAllUsers);

// Route to get all active crop listings
router.get('/crops', getAllCrops);

// Route to delete an inappropriate crop listing
router.delete('/crops/:id', deleteCropListing);

// Route to remove/ban a user account
router.delete('/users/:id', removeUser);

module.exports = router;
