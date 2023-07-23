require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');

const jsonParser = require('./middleware/jsonParser');

const bloodRequestRoutes = require('./routes/bloodRequests');
const bloodDonateRoutes = require('./routes/bloodDonate'); // Add this line to import the bloodDonateRoutes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Add this line to import the adminRoutes


// Middleware
const requireAuth = require('./middleware/requireAuth');

// Express app
const app = express();

// Middleware
app.use(jsonParser);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routers
app.use('/api/bloodRequests', bloodRequestRoutes);
app.use('/api/bloodDonate', bloodDonateRoutes); // Add this line to include the blood donation routes
app.use('/api/user', userRoutes);
app.use('/api/profile', requireAuth, profileRoutes);
app.use('/api/admin', adminRoutes); // Add this line to include the admin routes


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
