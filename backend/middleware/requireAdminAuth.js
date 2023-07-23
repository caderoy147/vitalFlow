const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const requireAdminAuth = async (req, res, next) => {
  try {
    // Check if the request has an 'Authorization' header with a valid JWT token
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }

    // Verify the JWT token and extract the payload (which includes _id)
    const decoded = jwt.verify(token, process.env.SECRET);
    const adminId = decoded._id;

    // Find the admin in the database
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin token' });
    }

    // Add the admin object to the request for further use in the controllers
    req.admin = admin;
    next(); // Move on to the next middleware/controller
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAdminAuth;
