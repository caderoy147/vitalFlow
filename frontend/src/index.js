import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/BloodDonationForm.css';
import App from './App';
import { BloodRequestsContextProvider } from './context/BloodRequestContext';
import { AuthContextProvider } from './context/AuthContext';
import { ProfileContextProvider } from './context/ProfileContext';
import { BloodDonationsContextProvider } from './context/BloodDonationContext'; // Import the BloodDonationsContextProvider

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <BloodRequestsContextProvider>
      <ProfileContextProvider>
        <BloodDonationsContextProvider> {/* Wrap with BloodDonationsContextProvider */}
          <App />
        </BloodDonationsContextProvider>
      </ProfileContextProvider>
    </BloodRequestsContextProvider>
  </AuthContextProvider>
);

