import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/BloodDonationForm.css';
import App from './App';
import { BloodRequestsContextProvider } from './context/BloodRequestContext';
import { AdminAuthContextProvider } from './context/AdminAuthContext';
import { UserAuthContextProvider } from './context/UserAuthContext'; // Import the UserAuthContextProvider
import { ProfileContextProvider } from './context/ProfileContext';
import { BloodDonationsContextProvider } from './context/BloodDonationContext'; // Import the BloodDonationsContextProvider

const root = createRoot(document.getElementById('root'));

root.render(
  <UserAuthContextProvider>
    <AdminAuthContextProvider>
      <BloodRequestsContextProvider>
        <ProfileContextProvider>
          <BloodDonationsContextProvider> {/* Wrap with BloodDonationsContextProvider */}
            <App />
          </BloodDonationsContextProvider>
        </ProfileContextProvider>
      </BloodRequestsContextProvider>
    </AdminAuthContextProvider>
  </UserAuthContextProvider>
);