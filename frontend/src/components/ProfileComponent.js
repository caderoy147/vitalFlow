import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
 // Import the CSS file

const ProfileComponent = () => {
  const { user } = useAuthContext(); // Assuming you have an authentication context available
  const [firstName, setFirstName] = useState("");
  const [bloodBagsDonated, setBloodBagsDonated] = useState("");
  const [available, setAvailable] = useState(false);
  const [donationCooldown, setDonationCooldown] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform API request to create the profile
      await axios.post(
        "/api/profile",
        {
          firstName,
          bloodBagsDonated,
          available,
          donationCooldown,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Handle the response and any necessary actions

      // Reset form fields
      setFirstName("");
      setBloodBagsDonated("");
      setAvailable(false);
      setDonationCooldown("");
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="profileComponent">
    <h2>Create Your Profile</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label htmlFor="bloodBagsDonated">Blood Bags Donated:</label>
      <input
        type="number"
        id="bloodBagsDonated"
        value={bloodBagsDonated}
        onChange={(e) => setBloodBagsDonated(e.target.value)}
      />

      {/* Use the checkbox container for "available" */}
      <div className="checkboxContainer">
        <label htmlFor="available">Available:</label>
        <input
          type="checkbox"
          id="available"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </div>

      <label htmlFor="donationCooldown">Donation Cooldown:</label>
      <input
        type="number"
        id="donationCooldown"
        value={donationCooldown}
        onChange={(e) => setDonationCooldown(e.target.value)}
      />

      <button type="submit">Create Profile</button>
    </form>
  </div>
  );
};

export default ProfileComponent;
