const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const { authenticateToken } = require('../middleware/auth');


router.get('/analytics/second-highest-order', authenticateToken, queryController.getSecondHighestOrder);
router.get('/analytics/monthly-analysis-2023', authenticateToken, queryController.getMonthlyAnalysis2023);
router.get('/analytics/low-selling-products', authenticateToken, queryController.getLowSellingProducts);

module.exports = router; 