import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import ProfilePage from './pages/ProfilePage';
import BloodDonationFormPage from './pages/BloodDonationFormPage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import Success from './pages/Success';
import './styles.scss';
import './landingPage.css';
import './aboutUs.css';
import './SuccessfullySignedUp.css';
import "./bloodRequestForm.css"; // Import the CSS file
function App() {
  
  

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "318301048533-eo90o3gavqu22cgsg6vuc87e65man0u3.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  //   );
  // }, []);
  const { user, isAdmin } = useAuthContext();
  const {user2} = useAuthContext();
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/Success" element={!user ? <Success /> : <Navigate to="/LandingPage" />} />
            <Route path="/home" element={user ? (isAdmin ? <AdminPage /> : <Home />) : <Navigate to="/login" />} />
            <Route path="/donate/:bloodRequestId" element={<BloodDonationFormPage />} />
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/home" />} />
            <Route path="/" element={!user || user? <LandingPage /> : <Navigate to="/LandingPage" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/aboutus" element={!user || user ? <AboutUs /> : <Navigate to="/aboutus" />} />
            <Route path="/LandingPage" element={!user || user ? <LandingPage /> : <Navigate to="/Success" />} />
          </Routes>
        </div>
      </BrowserRouter>
      
      
    </div>
  );
}



export default App;
