require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bloodRequestRoutes = require('./routes/bloodRequests');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profileRoutes');

// Middleware
const requireAuth = require('./middleware/requireAuth'); // Add this line to import the requireAuth middleware

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routers
app.use('/api/bloodRequests', bloodRequestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', requireAuth, profileRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
