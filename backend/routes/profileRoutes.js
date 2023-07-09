const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth'); // Add this line to import the requireAuth middleware

// Get user profile
router.get('/', requireAuth, profileController.getUserProfile);

// Create user profile
router.post('/', requireAuth, profileController.createUserProfile);

// Update user profile
router.put('/:id', requireAuth, profileController.updateUserProfile);

module.exports = router;
