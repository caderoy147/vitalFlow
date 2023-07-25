import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminLogin } from '../hooks/useAdminLogin';


const AdminLoginPage = ({ onSwitchToUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin, error, isLoading } = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call adminLogin function from useAdminAuth hook
    e.preventDefault();
    await adminLogin(email, password);

    // After successful login, redirect the admin to the admin page
    navigate('/admin');
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>ADMIN LOGIN</h1>
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
      <button type="button" onClick={onSwitchToUser}>
        Switch to User Login
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

export default AdminLoginPage;



