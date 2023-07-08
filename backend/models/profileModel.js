const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  bloodBagsDonated: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: false,
  },
  donationCooldown: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
