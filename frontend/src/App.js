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
import ProfilePage from './pages/ProfilePage'; // Add this import statement for the ProfilePage component


function App() {
  const [ user2 , setUser ] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "318301048533-eo90o3gavqu22cgsg6vuc87e65man0u3.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )


  }, []);
  const { user } = useAuthContext();
// NO USER SHOW SIGN IN, IF HAVE USER LOG OUT


  return (
    <div className="App">
      

      
      <BrowserRouter>
      <Navbar />
      <img src = {user2.picture}></img>
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path ="/AboutUs" element={user ? <AboutUs/> : <Navigate to="/AboutUs"/>}/> 
        </Routes>
        
      </div> 
    </BrowserRouter>
      
      
    </div>
  );
}

export default App;
