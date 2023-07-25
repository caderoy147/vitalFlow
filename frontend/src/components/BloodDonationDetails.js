import React from 'react';
import { useAuthContext } from '../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const BloodDonationDetails = ({ bloodDonation }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log(bloodDonation);
  const handleClick = async () => {
    if (!user || !bloodDonation?._id) {
      return;
    }
  };

  if (!bloodDonation) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  console.log(bloodDonation._id);
  return (
    <div className="blood-donation-details">
      <h4>{/* Display relevant blood donation details, e.g., donor's name */}</h4>
      <p><strong>Donated Previously: </strong>{bloodDonation.donatedPreviously ? "Yes" : "No"}</p>
      <p><strong>Last Donation Date: </strong>{bloodDonation.lastDonationDate}</p>
      <p><strong>Diabetes: </strong>{bloodDonation.medicalHistory.diabetes ? "Yes" : "No"}</p>
      <Link to={`/editDonation/${bloodDonation._id}`}>Edit Blood Donation</Link>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default BloodDonationDetails;
