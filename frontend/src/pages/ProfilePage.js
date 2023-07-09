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
    <div>
      <h2>Profile</h2>
      <p>First Name: {profile.firstName}</p>
      <p>Blood Bags Donated: {profile.bloodBagsDonated}</p>
      <p>Available: {profile.available ? 'Yes' : 'No'}</p>
      <p>Donation Cooldown: {profile.donationCooldown}</p>
      <ProfileComponent />
    </div>
  );
};

export default ProfilePage;
