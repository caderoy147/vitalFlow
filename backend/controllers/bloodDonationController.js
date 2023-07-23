const BloodDonation = require('../models/bloodDonationModel');
const BloodRequest = require('../models/BloodRequestModel');

const submitBloodDonationForm = async (req, res) => {
  const { bloodRequestId, lastDonationDate, donatedPreviously, lastSixMonthsActivities, medicalHistory, medications, surgeryTransfusionHistory, agreedToTerms } = req.body;

  try {
    // Check if the specified bloodRequestId corresponds to an existing BloodRequest
    const existingBloodRequest = await BloodRequest.findById(bloodRequestId);

    if (!existingBloodRequest) {
      return res.status(400).json({ error: 'Invalid Blood Request ID. Please select a valid Blood Request.' });
    }

    // Check if the person is eligible to donate based on medical history
    if (medicalHistory) {
      const { heartDiseases, diabetes, sexuallyTransmittedDiseases, lungDisease, allergicDisease, epilepsy, jaundice, faintingSpells, cancer, hepatitisBC, typhoid, tuberculosis, kidneyDisease, abnormalBleedingTendency, malaria } = medicalHistory;
      
      // Check for any medical conditions that might prevent blood donation
      if (heartDiseases || diabetes || sexuallyTransmittedDiseases || lungDisease || allergicDisease || epilepsy || jaundice || faintingSpells || cancer || hepatitisBC || typhoid || tuberculosis || kidneyDisease || abnormalBleedingTendency || malaria) {
        return res.status(400).json({ error: 'You are not eligible to donate blood due to medical history.' });
      }
    }

    // Create a new blood donation document
    const bloodDonation = await BloodDonation.create({
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
