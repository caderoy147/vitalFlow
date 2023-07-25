import { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuthContext'; // Import the UserAuthContext

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext); // Use the UserAuthContext

  if (!context) {
    throw Error('useAuthContext must be used inside a UserAuthContextProvider'); // Update the error message
  }

  return context;
};
