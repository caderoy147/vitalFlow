// AdminPage.js
import React, { useState, useEffect } from 'react';
import BloodDonationDetails from '../components/BloodDonationDetails';
import { useAuthContext } from '../hooks/useAuthContext'; // Import the useAuthContext hook
import { useBloodRequestsContext } from '../hooks/useBloodRequestsContext';
import BloodRequestDetails from '../components/BloodRequestDetails';

const AdminPage = () => {
  const { user } = useAuthContext(); // Get the user data from the context
  const [bloodDonations, setBloodDonations] = useState([]);
  const { bloodRequests, dispatch } = useBloodRequestsContext();

  useEffect(() => {
    if (user) {
      // Fetch blood donation data from the backend
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
  
      // Fetch blood requests data from the backend
      fetch('/api/bloodRequests', {
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
      .then(data => dispatch({ type: 'SET_BLOODREQUESTS', payload: data }))
      .catch(error => console.error('Error fetching blood requests:', error));
    }
  }, [user, dispatch]);
  

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

      <div className='donations-view-admin'>
              {bloodRequests && bloodRequests.length > 0 ? (
          bloodRequests.map((bloodRequest) => (
            <BloodRequestDetails key={bloodRequest._id} bloodRequest={bloodRequest} />
          ))
        ) : (
          <p>No blood donation submissions available.</p>
        )}
      </div>



    </div>
  );
};

export default AdminPage;
