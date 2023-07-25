import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { useBloodDonationsContext } from "../hooks/useBloodDonationsContext";
import { useAuthContext } from "../hooks/useUserAuth"; // Add this import

const UserBloodDonationForm = () => {
  const { bloodRequestId } = useParams();
  const { dispatch } = useBloodDonationsContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    bloodRequestId: bloodRequestId,
    lastDonationDate: null,
    donatedPreviously: false,
    lastSixMonthsActivities: {
      tattooing: false,
      earPiercing: false,
      dentalExtraction: false,
    },
    medicalHistory: {
      heartDiseases: false,
      diabetes: false,
      sexuallyTransmittedDiseases: false,
      lungDisease: false,
      allergicDisease: false,
      epilepsy: false,
      jaundice: false,
      faintingSpells: false,
      cancer: false,
      hepatitisBC: false,
      typhoid: false,
      tuberculosis: false,
      kidneyDisease: false,
      abnormalBleedingTendency: false,
      malaria: false,
    },
    medications: {
      antibiotics: false,
      steroids: false,
      aspirin: false,
      vaccinations: false,
      alcohol: false,
      dogBiteRabiesVaccine: false,
    },
    surgeryTransfusionHistory: {
      majorSurgery: false,
      minorSurgery: false,
      bloodTransfusion: false,
    },
    agreedToTerms: false,
  });

   // Fetch the user's profile data when the component mounts
   useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user && user.token) {
          // Make a request to get the user's profile
          const response = await axios.get('/api/profile', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          // Set the profile state with the retrieved profile data
          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
        setProfile(null);
      }
    };
    fetchUserProfile();
  }, [user]);
  
  // Rest of the code...
  //console.log(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the user is authenticated and has a profile
      if (!user || !user.token) {
        // If the user doesn't have a profile or token, they cannot donate
        return setErrorMessage('You must be logged in and have a profile to submit a blood donation.');
      }
  
      // Check if the user has a profile and extract the user ID
      console.log(profile);
      if (!profile) {
        return setErrorMessage('You must have a profile to submit a blood donation.');
      }
      
      const userId = profile._id; // Extracting the user ID from the profile
      
      // Add the profile field to the formData with the user ID
      const updatedFormData = {
        ...formData,
        profile: userId,
      };
      console.log(userId);
      // Submit the blood donation form with the updated formData
      const response = await axios.post('/api/bloodDonate', updatedFormData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      console.log('Blood donation form submitted successfully:', response.data);
      dispatch({ type: "ADD_BLOOD_DONATION", payload: response.data });
      // Optionally, you can show a success message to the user.
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.error) {
        // If the backend returned a 400 status with the specific error message, show that message to the user
        console.error('Error submitting blood donation form:', error.response.data.error);
        // Optionally, you can display the error message to the user using a toast, modal, or other means.
        setErrorMessage(error.response.data.error);
      } else {
        // For other errors (e.g., network error, server error), show a generic error message
        console.error('Error submitting blood donation form:', error.message);
        // Optionally, you can display a generic error message to the user.
        setErrorMessage('An error occurred while submitting the form. Please try again later.');
      }
    }
  };
  

  const handleDateChange = (name, value) => {
    // Create a new Date object using the extracted day, month, and year values
    const date = new Date(value.year, value.month - 1, value.day);
  
    // Update formData with the new Date object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleCheckboxChange = (e) => {
    console.log('name:', e.target.name);
    console.log('checked:', e.target.checked);
    console.log('dataset.subfield:', e.target.dataset.subfield);
    const { name, checked, dataset } = e.target;
    if (dataset.subfield) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: {
          ...prevFormData[name],
          [dataset.subfield]: checked,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-donate">
      {/* Blood Request ID */}
      <label htmlFor="bloodRequestId">Blood Request ID:</label>
      <input
        type="text"
        id="bloodRequestId"
        name="bloodRequestId"
        value={formData.bloodRequestId}
        onChange={(e) => handleCheckboxChange(e.target.name, e.target.value)}
        required
      />

      {/* Last Donation Date */}
      <h3>Last Donation Date</h3>
      <DatePicker
      selected={formData.lastDonationDate}
      onChange={(date) => setFormData((prevFormData) => ({ ...prevFormData, lastDonationDate: date }))}
      dateFormat="MM/dd/yyyy"
      isClearable
      placeholderText="Click to select a date"
      required
    />


      {/* Donated Previously */}
      <label htmlFor="donatedPreviously">Have you donated blood previously?</label>
      <input
        type="checkbox"
        id="donatedPreviously"
        name="donatedPreviously"
        checked={formData.donatedPreviously}
        onChange={handleCheckboxChange}
      />
  
      {/* Last Six Months Activities */}
      <h3>Last Six Months Activities</h3>
      <label htmlFor="tattooing">Tattooing:</label>
      <input
        type="checkbox"
        id="tattooing"
        name="lastSixMonthsActivities"
        data-subfield="tattooing"
        checked={formData.lastSixMonthsActivities.tattooing}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="earPiercing">Ear Piercing:</label>
      <input
        type="checkbox"
        id="earPiercing"
        name="lastSixMonthsActivities"
        data-subfield="earPiercing"
        checked={formData.lastSixMonthsActivities.earPiercing}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="dentalExtraction">Dental Extraction:</label>
      <input
        type="checkbox"
        id="dentalExtraction"
        name="lastSixMonthsActivities"
        data-subfield="dentalExtraction"
        checked={formData.lastSixMonthsActivities.dentalExtraction}
        onChange={handleCheckboxChange}
      />
  
        {/* Medical History */}
        <h3>Medical History</h3>
        <label htmlFor="heartDiseases">Heart Diseases:</label>
        <input
          type="checkbox"
          id="heartDiseases"
          name="medicalHistory"
          data-subfield="heartDiseases"
          checked={formData.medicalHistory.heartDiseases}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="diabetes">Diabetes:</label>
        <input
          type="checkbox"
          id="diabetes"
          name="medicalHistory"
          data-subfield="diabetes"
          checked={formData.medicalHistory.diabetes}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="sexuallyTransmittedDiseases">Sexually Transmitted Diseases:</label>
        <input
          type="checkbox"
          id="sexuallyTransmittedDiseases"
          name="medicalHistory"
          data-subfield="sexuallyTransmittedDiseases"
          checked={formData.medicalHistory.sexuallyTransmittedDiseases}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="lungDisease">Lung Disease:</label>
        <input
          type="checkbox"
          id="lungDisease"
          name="medicalHistory"
          data-subfield="lungDisease"
          checked={formData.medicalHistory.lungDisease}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="allergicDisease">Allergic Disease:</label>
        <input
          type="checkbox"
          id="allergicDisease"
          name="medicalHistory"
          data-subfield="allergicDisease"
          checked={formData.medicalHistory.allergicDisease}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="epilepsy">Epilepsy:</label>
        <input
          type="checkbox"
          id="epilepsy"
          name="medicalHistory"
          data-subfield="epilepsy"
          checked={formData.medicalHistory.epilepsy}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="jaundice">Jaundice:</label>
        <input
          type="checkbox"
          id="jaundice"
          name="medicalHistory"
          data-subfield="jaundice"
          checked={formData.medicalHistory.jaundice}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="faintingSpells">Fainting Spells:</label>
        <input
          type="checkbox"
          id="faintingSpells"
          name="medicalHistory"
          data-subfield="faintingSpells"
          checked={formData.medicalHistory.faintingSpells}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="cancer">Cancer:</label>
        <input
          type="checkbox"
          id="cancer"
          name="medicalHistory"
          data-subfield="cancer"
          checked={formData.medicalHistory.cancer}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="hepatitisBC">Hepatitis B/C:</label>
        <input
          type="checkbox"
          id="hepatitisBC"
          name="medicalHistory"
          data-subfield="hepatitisBC"
          checked={formData.medicalHistory.hepatitisBC}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="typhoid">Typhoid:</label>
        <input
          type="checkbox"
          id="typhoid"
          name="medicalHistory"
          data-subfield="typhoid"
          checked={formData.medicalHistory.typhoid}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="tuberculosis">Tuberculosis:</label>
        <input
          type="checkbox"
          id="tuberculosis"
          name="medicalHistory"
          data-subfield="tuberculosis"
          checked={formData.medicalHistory.tuberculosis}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="kidneyDisease">Kidney Disease:</label>
        <input
          type="checkbox"
          id="kidneyDisease"
          name="medicalHistory"
          data-subfield="kidneyDisease"
          checked={formData.medicalHistory.kidneyDisease}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="abnormalBleedingTendency">Abnormal Bleeding Tendency:</label>
        <input
          type="checkbox"
          id="abnormalBleedingTendency"
          name="medicalHistory"
          data-subfield="abnormalBleedingTendency"
          checked={formData.medicalHistory.abnormalBleedingTendency}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="malaria">Malaria:</label>
        <input
          type="checkbox"
          id="malaria"
          name="medicalHistory"
          data-subfield="malaria"
          checked={formData.medicalHistory.malaria}
          onChange={handleCheckboxChange}
        />

  
      {/* Medications */}
      <h3>Medications</h3>
      <label htmlFor="antibiotics">Antibiotics:</label>
      <input
        type="checkbox"
        id="antibiotics"
        name="medications"
        data-subfield="antibiotics"
        checked={formData.medications.antibiotics}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="steroids">Steroids:</label>
      <input
        type="checkbox"
        id="steroids"
        name="medications"
        data-subfield="steroids"
        checked={formData.medications.steroids}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="aspirin">Aspirin:</label>
      <input
        type="checkbox"
        id="aspirin"
        name="medications"
        data-subfield="aspirin"
        checked={formData.medications.aspirin}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="vaccinations">Vaccinations:</label>
      <input
        type="checkbox"
        id="vaccinations"
        name="medications"
        data-subfield="vaccinations"
        checked={formData.medications.vaccinations}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="alcohol">Alcohol:</label>
      <input
        type="checkbox"
        id="alcohol"
        name="medications"
        data-subfield="alcohol"
        checked={formData.medications.alcohol}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="dogBiteRabiesVaccine">Dog Bite Rabies Vaccine:</label>
      <input
        type="checkbox"
        id="dogBiteRabiesVaccine"
        name="medications"
        data-subfield="dogBiteRabiesVaccine"
        checked={formData.medications.dogBiteRabiesVaccine}
        onChange={handleCheckboxChange}
      />
  
        {/* Surgery and Transfusion History */}
        <h3>Surgery and Transfusion History</h3>
        <label htmlFor="majorSurgery">Major Surgery:</label>
        <input
          type="checkbox"
          id="majorSurgery"
          name="surgeryTransfusionHistory"
          data-subfield="majorSurgery"
          checked={formData.surgeryTransfusionHistory.majorSurgery}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="minorSurgery">Minor Surgery:</label>
        <input
          type="checkbox"
          id="minorSurgery"
          name="surgeryTransfusionHistory"
          data-subfield="minorSurgery"
          checked={formData.surgeryTransfusionHistory.minorSurgery}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="bloodTransfusion">Blood Transfusion:</label>
        <input
          type="checkbox"
          id="bloodTransfusion"
          name="surgeryTransfusionHistory"
          data-subfield="bloodTransfusion"
          checked={formData.surgeryTransfusionHistory.bloodTransfusion}
          onChange={handleCheckboxChange}
        />

      <label htmlFor="agreedToTerms">I agree to the terms and conditions:</label>
      <input
        type="checkbox"
        id="agreedToTerms"
        name="agreedToTerms"
        checked={formData.agreedToTerms}
        onChange={handleCheckboxChange}
        required
      />
    {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="submit">Submit</button>
    </form>
    
  );
};

export default UserBloodDonationForm;
