import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FcGoogle } from "react-icons/fc";

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
      <h3>LOG IN TO YOUR ACCOUNT</h3>
      
      <label></label>

      <input 
        type="email" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 

      />
      
      <label></label>
      <input 
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign in</button>
      {error && <div className="error">{error}</div>}
      <FcGoogle className="Google-Icon"/>
    </form>
  );
};

export default Login;
//hi