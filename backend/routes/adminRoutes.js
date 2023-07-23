const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Admin registration
router.post('/register', AdminController.registerAdmin);

// Admin login
router.post('/login', AdminController.loginAdmin);

// Other admin-specific routes can be defined here

module.exports = router;