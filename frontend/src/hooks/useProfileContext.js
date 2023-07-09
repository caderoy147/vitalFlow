import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
