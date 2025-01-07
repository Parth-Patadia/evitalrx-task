const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.post('/orders', authenticateToken, orderController.createOrder);
router.get('/orders', authenticateToken, orderController.getUserOrders);
router.get('/orders/:orderId', authenticateToken, orderController.getOrder);
router.put('/orders/:orderId/status', authenticateToken, orderController.updateOrderStatus);

module.exports = router; 