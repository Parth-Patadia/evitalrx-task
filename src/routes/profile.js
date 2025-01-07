const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

router.get('/profile', authenticateToken, profileController.getProfile);

module.exports = router; 