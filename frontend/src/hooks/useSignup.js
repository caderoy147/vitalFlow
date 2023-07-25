import { useState } from 'react'
import { useAuthContext } from './useUserAuth'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // New state to track successful signup

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    console.log('Signup Response:', response);
    console.log('Signup Response JSON:', json);
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // Set signup success flag
      setIsSignupSuccessful(true);

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, isSignupSuccessful }
}