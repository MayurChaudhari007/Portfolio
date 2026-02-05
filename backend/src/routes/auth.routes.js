const express = require('express');
const { login, register, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public Routes
router.post('/login', login);
router.post('/register', register); // Caution: Secure this in production

// Protected Routes
router.get('/me', protect, getMe);

module.exports = router;
