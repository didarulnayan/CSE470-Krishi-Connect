const express = require('express');
const router = express.Router();
const { addCrop } = require('../controllers/cropController');

// Route to handle adding a crop
router.post('/add', addCrop);

module.exports = router;