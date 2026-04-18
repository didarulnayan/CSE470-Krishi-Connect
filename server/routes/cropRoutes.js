const express = require('express');
const router = express.Router();
const { addCrop } = require('../controllers/cropController');

// When someone sends a POST request to '/add', run the addCrop controller
router.post('/add', addCrop);

module.exports = router;