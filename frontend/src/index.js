import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './Styles.css';
import './styles.scss';
import App from './App';

// Import the context providers
import { BloodRequestsContextProvider } from './context/BloodRequestContext';
import { AuthContextProvider } from './context/AuthContext';
import { ProfileContextProvider } from './context/ProfileContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <BloodRequestsContextProvider>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </BloodRequestsContextProvider>
  </AuthContextProvider>
);
