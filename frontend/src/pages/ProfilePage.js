import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfileComponent from '../components/ProfileComponent';

const ProfilePage = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found. Please create your profile.</div>;
  }

  return (
  <div className="container">
  <div className="profileDisplay">
    <h2>Profile</h2>
    <p>
      <span className="label">First Name</span> {profile.firstName}
    </p>
    <p>
      <span className="label">Blood Bags Donated</span>{" "}
      {profile.bloodBagsDonated}
    </p>
    <p>
      <span className="label">Available</span>{" "}
      {profile.available ? "Yes" : "No"}
    </p>
    <p>
      <span className="label">Donation Cooldown</span>{" "}
      {profile.donationCooldown}
    </p>
  </div>
  <div className="profspan">
    <span><ProfileComponent /></span>
  </div>
</div>

    
    
  );
};

export default ProfilePage;
