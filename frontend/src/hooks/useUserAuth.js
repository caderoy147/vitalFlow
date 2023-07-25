import { useContext } from 'react';
import { UserAuthContext } from '../context/UserAuthContext'; // Import the UserAuthContext

export const useAuthContext = () => {
  const context = useContext(UserAuthContext); // Use the UserAuthContext

  if (!context) {
    throw Error('useAuthContext must be used inside a UserAuthContextProvider'); // Update the error message
  }

  return context;
};
