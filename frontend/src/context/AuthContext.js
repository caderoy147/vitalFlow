import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, isAdmin: action.payload.isAdmin };
    case 'LOGOUT':
      return { user: null, isAdmin: false }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    isAdmin: false 
  })

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('User data in local storage:', user);

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('Parsed user data:', parsedUser);
        dispatch({ type: 'LOGIN', payload: { user: parsedUser.user, isAdmin: parsedUser.isAdmin } });
      } catch (error) {
        // Handle any parsing errors
        console.error('Error parsing user data:', error);
      }
    } else {
      // If user data is not found in local storage, you can handle it here.
      // For example, you can log out the user by dispatching the 'LOGOUT' action:
      // dispatch({ type: 'LOGOUT' });
    }
  }, []);
  
  

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}