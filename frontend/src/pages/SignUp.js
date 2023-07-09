import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

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
      <input 
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <input 
        type="password" 
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmPassword} 
      />
      {password !== confirmPassword && (
        <div className="error_confirm">Passwords do not match</div>
      )}
      
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>} 
      <p className = "OR"> OR </p>
        <p className = "Signwith"> Sign up with </p>
      <div className="image-wrapper2">
      <img href = "" src="./images/google.png" alt="Google" className="img2" />
      <img href = "" src="./images/ms.png" alt="MS" className="img3" />
    </div>
    <p className="Signwith"> Already have an account? <a href="/login" className="noAcc"> Log in</a></p>
    </form>
  )
}

export default SignUp
//hi