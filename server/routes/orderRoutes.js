const express = require('express');
const router = express.Router();
const { createOrder, getIncomingOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/add', createOrder);
router.get('/incoming', getIncomingOrders);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
