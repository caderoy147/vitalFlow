import { useState } from 'react';
import { useAdminAuth } from './useAdminAuth';

export const useAdminLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAdminAuth();

  const adminLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // Save the user to local storage
        localStorage.setItem('admin', JSON.stringify(json));

        // Update the admin auth context with user information
        dispatch({ type: 'LOGIN', payload: { user: json } });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return { adminLogin, isLoading, error };
};
