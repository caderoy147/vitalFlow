import { useLogin } from "../hooks/useLogin";
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">Password</label>
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

          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button disabled={isLoading}>Sign in</button>
        {error && <div className="error">{error}</div>}
        <p className="OR"> OR </p>
        <p className="Signwith"> Sign in with </p>
        <div className="image-wrapper2">
          <img src="./images/google.png" alt="Google" className="img2" />
          <div id="signInDiv"></div>
          <img src="./images/ms.png" alt="MS" className="img3" />
        </div>
      </div>
      <p className="Signwith"> Don't have an account? <a href="/signup" className="noAcc"> Sign up</a></p>
    </form>
  );
};

export default Login;
