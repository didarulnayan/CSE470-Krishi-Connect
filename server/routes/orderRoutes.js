const express = require('express');
const router = express.Router();
const { createOrder, getFarmerOrders, updateOrderStatus, hideOrderFromDashboard } = require('../controllers/orderController');

router.post('/add', createOrder);
router.get('/farmer/:farmerName', getFarmerOrders);
router.put('/:id/status', updateOrderStatus);
router.put('/:id/hide', hideOrderFromDashboard);

module.exports = router;
