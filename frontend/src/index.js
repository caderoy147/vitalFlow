import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// we import the context 
import { BloodRequestsContextProvider } from './context/BloodRequestContext';
import { AuthContextProvider } from './context/AuthContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BloodRequestsContextProvider>
        <App />
      </BloodRequestsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
