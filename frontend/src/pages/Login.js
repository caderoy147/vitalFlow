import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, isAdmin ? '/api/admin/login' : '/api/user/login', () => {
      // After successful login, redirect the user to the appropriate page
      if (isAdmin) {
        navigate('/admin'); // Redirect to admin page
      } else {
        navigate('/'); // Redirect to regular user page
      }
    });
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "318301048533-eo90o3gavqu22cgsg6vuc87e65man0u3.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
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
        <button type="button" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
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

export default Login;
