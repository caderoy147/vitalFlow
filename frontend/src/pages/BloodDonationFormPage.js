import React from 'react';
import UserBloodDonationForm from '../components/BloodDonationForm'; // Update the path as needed

const BloodDonationFormPage = () => {
  return (
    <div>
      {/* You can add a heading or any content specific to the donation form page */}
      <h2>Blood Donation Form</h2>

      {/* Render the UserBloodDonationForm component */}
      <UserBloodDonationForm />
    </div>
  );
};

export default BloodDonationFormPage;
