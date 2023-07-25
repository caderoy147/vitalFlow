import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // If there's no user or the user is an admin, set the profile to null
        if (!user || user.isAdmin) {
          setProfile(null);
        } else {
          const response = await axios.get('/api/profile', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setProfile(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
