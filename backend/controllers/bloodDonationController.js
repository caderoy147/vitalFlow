const BloodDonation = require('../models/bloodDonationModel');
const BloodRequest = require('../models/BloodRequestModel');
const Profile = require('../models/profileModel'); // Import the Profile model

const submitBloodDonationForm = async (req, res) => {
  const {profile, bloodRequestId, lastDonationDate, donatedPreviously, lastSixMonthsActivities, medicalHistory, medications, surgeryTransfusionHistory, agreedToTerms } = req.body;

  try {
    // Check if the specified bloodRequestId corresponds to an existing BloodRequest
    const existingBloodRequest = await BloodRequest.findById(bloodRequestId);

    if (!existingBloodRequest) {
      return res.status(400).json({ error: 'Invalid Blood Request ID. Please select a valid Blood Request.' });
    }

    // Check if the person is eligible to donate based on medical history
    if (medicalHistory) {
      const medicalHistoryValues = Object.values(medicalHistory);
      if (medicalHistoryValues.includes(true)) {
        return res.status(400).json({ error: 'You are not eligible to donate blood due to medical history.' });
      }
    }

    // Get the user ID from the authenticated user's data (assuming it is available in req.user._id)
    const userId = req.user._id;

    // Check if the user has a profile
    const existingProfile = await Profile.findOne({ user: userId });

    if (!existingProfile) {
      return res.status(400).json({ error: 'You cannot make a blood donation without a profile. Please create a profile first.' });
    }

    // Create a new blood donation document
    const bloodDonation = await BloodDonation.create({
      profile,
      bloodRequestId,
      lastDonationDate,
      donatedPreviously,
      lastSixMonthsActivities,
      medicalHistory,
      medications,
      surgeryTransfusionHistory,
      agreedToTerms
    });

    res.status(201).json(bloodDonation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Rest of your code...


// Controller function to get all blood donation submissions (for admin view)
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await BloodDonation.find({}); // Retrieve all blood donation submissions from the database

    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  submitBloodDonationForm,
  getAllSubmissions, // Add the getAllSubmissions function to the exports
};
