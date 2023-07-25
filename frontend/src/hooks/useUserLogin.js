import { useState } from 'react';
import { useAuthContext} from './useUserAuth';

export const useUserLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext(); // Use useUserAuth instead of useAuthContext

  const userLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/login', {
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

        // Update the user auth context with user information
        dispatch({ type: 'LOGIN', payload: { user: json } });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return { userLogin, isLoading, error };
};
