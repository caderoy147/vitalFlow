import { useSignup } from "../hooks/useSignup";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const [user2, setUser] = useState({});
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
      { theme: "outline", size: "large" }
    );
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="image-wrapper">
        <img src="./images/vitalflow.png" alt="VITAL LOGO" className="img1" />
      </div>
      <h3>SIGN UP</h3>

      <label></label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label></label>
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label className="show" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </label>
      </div>
      <div className="password-wrapper">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <label className="show" onClick={toggleConfirmPasswordVisibility}>
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </label>
      </div>
      
      {password !== confirmPassword && (
        <div className="error_confirm">Passwords do not match</div>
      )}

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <p className="OR"> OR </p>
      <p className="Signwith"> Sign up with </p>
      <div className="image-wrapper2">
        <img href="" src="./images/google.png" alt="Google" className="img2" />
        <div id="signInDiv"></div>
        <img href="" src="./images/ms.png" alt="MS" className="img3" />
      </div>
      <p className="Signwith">
        Already have an account? <a href="/login" className="noAcc"> Log in</a>
      </p>
    </form>
  );
};

export default SignUp;