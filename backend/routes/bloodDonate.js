// bloodDonation.js
const express = require('express');
const router = express.Router();
const bloodDonationController = require('../controllers/bloodDonationController');
const requireAdminAuth = require('../middleware/requireAdminAuth'); // Middleware to require admin authentication
const requireAuth = require('../middleware/requireAuth');

// Create a new blood donation
router.post('/', requireAuth,bloodDonationController.submitBloodDonationForm);

// Fetch all blood donation submissions (for admin view)
router.get('/submissions', requireAdminAuth, bloodDonationController.getAllSubmissions);

module.exports = router;