const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodDonationSchema = new Schema({
  profile: { // Add a reference to the Profile model
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  bloodRequestId: {
    type: Schema.Types.ObjectId,
    ref: 'BloodRequest',
    required: true
  },
  lastDonationDate: {
    type: String, // Store the date as a string
    required: true
  },
  donatedPreviously: {
    type: Boolean
  },
  lastSixMonthsActivities: {
    tattooing: {
      type: Boolean
    },
    earPiercing: {
      type: Boolean
    },
    dentalExtraction: {
      type: Boolean
    }
  },
  medicalHistory: {
    heartDiseases: {
      type: Boolean
    },
    diabetes: {
      type: Boolean
    },
    sexuallyTransmittedDiseases: {
      type: Boolean
    },
    lungDisease: {
      type: Boolean
    },
    allergicDisease: {
      type: Boolean
    },
    epilepsy: {
      type: Boolean
    },
    jaundice: {
      type: Boolean
    },
    faintingSpells: {
      type: Boolean
    },
    cancer: {
      type: Boolean
    },
    hepatitisBC: {
      type: Boolean
    },
    typhoid: {
      type: Boolean
    },
    tuberculosis: {
      type: Boolean
    },
    kidneyDisease: {
      type: Boolean
    },
    abnormalBleedingTendency: {
      type: Boolean
    },
    malaria: {
      type: Boolean
    }
  },
  medications: {
    antibiotics: {
      type: Boolean
    },
    steroids: {
      type: Boolean
    },
    aspirin: {
      type: Boolean
    },
    vaccinations: {
      type: Boolean
    },
    alcohol: {
      type: Boolean
    },
    dogBiteRabiesVaccine: {
      type: Boolean
    }
  },
  surgeryTransfusionHistory: {
    majorSurgery: {
      type: Boolean
    },
    minorSurgery: {
      type: Boolean
    },
    bloodTransfusion: {
      type: Boolean
    }
  },
  agreedToTerms: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BloodDonation', bloodDonationSchema);
