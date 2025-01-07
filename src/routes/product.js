const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticateToken} = require('../middleware/auth');

router.get('/products',productController.getAllProducts);
router.get('/products/:id',productController.getProduct);
router.post('/products',authenticateToken,productController.addProduct);

module.exports = router;