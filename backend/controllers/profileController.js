const Profile = require('../models/profileModel');
const User = require('../models/userModel');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'email');
    if (!profile) {
      return res.status(200).json({ message: 'Please create your profile' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create user profile
const createUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }
    const newProfile = new Profile({
      user: req.user._id,
      firstName: req.body.firstName,
      bloodBagsDonated: req.body.bloodBagsDonated,
      available: req.body.available,
      donationCooldown: req.body.donationCooldown,
    });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile.firstName = req.body.firstName || profile.firstName;
    profile.bloodBagsDonated = req.body.bloodBagsDonated || profile.bloodBagsDonated;
    profile.available = req.body.available || profile.available;
    profile.donationCooldown = req.body.donationCooldown || profile.donationCooldown;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
};
