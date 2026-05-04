const express = require('express');
const router = express.Router();
const { getProduceList } = require('../controllers/produceController');

router.get('/', getProduceList);

module.exports = router;
