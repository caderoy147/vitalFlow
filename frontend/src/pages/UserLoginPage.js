import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUserLogin } from '../hooks/useUserLogin';

const UserLoginPage = ({ onSwitchToAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, error, isLoading } = useUserLogin(); // Use useUserLogin
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin(email, password); // Use userLogin from useUserLogin hook
    // After successful login, redirect the user to the home page
    navigate('/');
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>USER LOGIN</h1>
    <div className="image-wrapper">
      <img src="./images/vitalflow.png" alt="VITAL LOGO" className="img1" />
    </div>
    <h3 className="LUG">LOG IN TO YOUR ACCOUNT</h3>
    <div className="form-wrapper">
      <input
        type="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label className="show" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </label>

        <Link className="forgot-password">Forgot Password?</Link>
      </div>

      <button disabled={isLoading}>Sign in</button>
      <button type="button" onClick={onSwitchToAdmin}>
        Switch to Admin Login
      </button>
      {error && <div className="error">{error}</div>}
      <p className="OR"> OR </p>
      <p className="Signwith"> Sign in with </p>
      <div className="image-wrapper2">
        <img src="./images/google.png" alt="Google" className="img2" />
        <div id="signInDiv"></div>
        <img src="./images/ms.png" alt="MS" className="img3" />
      </div>
    </div>
    <p className="Signwith"> Don't have an account?<Link to="/signup" className="noAcc">Sign up</Link></p>
  </form>
  );
};

export default UserLoginPage;