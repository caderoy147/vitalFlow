// AdminPage.js
import React, { useState, useEffect } from 'react';
import BloodDonationDetails from '../components/BloodDonationDetails';
import { useAuthContext } from '../hooks/useAuthContext'; // Import the useAuthContext hook

const AdminPage = () => {
  const { user } = useAuthContext(); // Get the user data from the context
  const [bloodDonations, setBloodDonations] = useState([]);

  useEffect(() => {
    // Fetch blood donation data from the backend when the component mounts
    if (user) {
      fetch('/api/bloodDonate/submissions', {
        headers: {
          'Authorization': `Bearer ${user.token}` // Include the user token in the Authorization header
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then(data => setBloodDonations(data))
        .catch(error => console.error('Error fetching blood donations:', error));
    }
  }, [user]);

  return (
    <div className="admin-page">
      <h1>Welcome to the Admin Dashboard</h1>


      <div className='donations-view-admin'>
      <h2>Blood Donations</h2>
      {bloodDonations.length > 0 ? (
        bloodDonations.map((bloodDonation) => (
          <BloodDonationDetails key={bloodDonation._id} bloodDonation={bloodDonation} />
        ))
      ) : (
        <p>No blood donation submissions available.</p>
      )}
      </div>


    </div>
  );
};

export default AdminPage;
