const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus, createOrder } = require('../controllers/orderController');

// Route to get all orders (for dashboard)
router.get('/', getOrders);

// Route to create a new order
router.post('/create', createOrder);

// Route to update order status (Accept or Reject)
router.put('/:orderId', updateOrderStatus);

module.exports = router;
