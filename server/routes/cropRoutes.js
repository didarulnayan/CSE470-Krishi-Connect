const express = require('express');
const router = express.Router();
const { getCrops, getCropById, addCrop } = require('../controllers/cropController');

router.get('/', getCrops);
router.get('/:id', getCropById);
router.post('/add', addCrop);

module.exports = router;
