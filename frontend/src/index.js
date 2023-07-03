import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// we import the context 
import { BloodRequestsContextProvider } from './context/BloodRequestContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BloodRequestsContextProvider>
      <App />
    </BloodRequestsContextProvider>
  </React.StrictMode>
);
