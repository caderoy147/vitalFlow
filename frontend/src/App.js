import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useUserAuth';
import { useAdminAuth } from './hooks/useAdminAuth';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLogin';

import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import ProfilePage from './pages/ProfilePage';
import BloodDonationFormPage from './pages/BloodDonationFormPage';
import AdminPage from './pages/AdminPage';

function App() {
  const { user } = useAuthContext();

  const { isAdmin } = useAdminAuth();// Destructure isAdmin and adminLogin
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  console.log(user);
  console.log(isAdmin);

  const switchToAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const switchToUserLogin = () => {
    setShowAdminLogin(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
          <Route
              path="/"
              element={
                user ? (isAdmin ? <AdminPage /> : <Home />) : showAdminLogin ? (
                  <AdminLoginPage onSwitchToUser={switchToUserLogin} />
                ) : (
                  <UserLoginPage onSwitchToAdmin={switchToAdminLogin} />
                )
              }
            />
            {/* Rest of the routes */}
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <AdminLoginPage />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/aboutUs" element={user ? <AboutUs /> : <Navigate to="/aboutUs" />} />
            <Route path="/donate/:bloodRequestId" element={<BloodDonationFormPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
