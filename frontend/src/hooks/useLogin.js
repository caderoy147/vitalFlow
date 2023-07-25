import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password, endpoint) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
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
        localStorage.setItem('user', JSON.stringify(json));

        // Determine if the user is an admin or not based on the response
        const isAdmin = endpoint === '/api/admin/login';

        // Update the auth context with both user and admin information
        dispatch({ type: 'LOGIN', payload: { user: json, isAdmin } });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
