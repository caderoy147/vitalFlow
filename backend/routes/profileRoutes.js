const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get user profile
router.get('/', profileController.getUserProfile);

// Create user profile
router.post('/', profileController.createUserProfile);

// Update user profile
router.put('/:id', profileController.updateUserProfile);

module.exports = router;
