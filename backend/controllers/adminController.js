const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Admin registration
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new admin document in the database
    const admin = await Admin.createAdmin(email, password);

    // Create a token for the admin
    const token = createToken(admin._id);

    // Return the admin's email and token in the response
    res.status(200).json({ email, token, isAdmin: true });
  } catch (error) {
    // Handle registration errors
    res.status(400).json({ error: error.message });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin user by email and validate password
    const admin = await Admin.login(email, password);

    // Check if the user is an admin
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
    }

    // Create a token for the admin
    const token = createToken(admin._id);

    // Return the admin's email and token in the response
    res.status(200).json({ email, token, isAdmin: true });
  } catch (error) {
    // Handle login errors
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
