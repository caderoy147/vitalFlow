import { useState } from "react";
import { useLogin } from "../hooks/useLogin";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    
      <form className="login" onSubmit={handleSubmit}>
    <div className="image-wrapper">
      <img src="./images/vitalflow.png" alt="VITAL LOGO" className="img1" />
    </div>
    <h3 className="LUG">LOG IN TO YOUR ACCOUNT</h3>
    <div className="form-wrapper">
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
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>

      <button disabled={isLoading}>Sign in</button>
      {error && <div className="error">{error}</div>}

        <p className = "OR"> OR </p>
        <p className = "Signwith"> Sign in with </p>
      <div className="image-wrapper2">
      <img href = "" src="./images/google.png" alt="Google" className="img2" />
      <img href = "" src="./images/ms.png" alt="MS" className="img3" />
    </div>
    </div>
    <p className="Signwith"> Don't have an account? <a href="/signup" className="noAcc"> Sign up</a></p>
  </form>
  );
};

export default Login;