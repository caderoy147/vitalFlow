import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BloodDonationDetails = ({ bloodDonation }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log(bloodDonation);
  const handleClick = async () => {
    if (!user || !bloodDonation?._id) {
      return;
    }

    // Implement the DELETE functionality for blood donation, similar to the BloodRequestDetails component
    // You can use the '/api/bloodDonations/' + bloodDonation._id endpoint for the DELETE request.
    // Don't forget to pass the Authorization header with the user token.

    // Example code for DELETE request:
    // const response = await fetch('/api/bloodDonations/' + bloodDonation._id, {
    //   method: 'DELETE',
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`
    //   }
    // });
    // const json = await response.json();
    // if (response.ok) {
    //   // Perform any additional actions after successful deletion, if needed.
    // }
  };

  if (!bloodDonation) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  console.log(bloodDonation._id);
  return (
    <div class="grid-container">
    <div class="blood-donation-details">
      {/* <h4><!-- Display relevant blood donation details, e.g., donor's name --></h4> */}
      <p><strong>Donated Previously: </strong>{bloodDonation.donatedPreviously ? "Yes" : "No"}</p>
      <p><strong>Last Donation Date: </strong>{bloodDonation.lastDonationDate}</p>
      <p><strong>Diabetes: </strong>{bloodDonation.medicalHistory.diabetes ? "Yes" : "No"}</p>
      <span class="material-symbols-outlined" id="delete-button">delete</span>
    </div>
  </div>
  );
};

export default BloodDonationDetails;
