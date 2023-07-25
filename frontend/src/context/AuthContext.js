import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, isAdmin: action.payload.isAdmin };
    case 'LOGOUT':
      return { user: null, isAdmin: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: 'LOGIN', payload: { user: parsedUser.user, isAdmin: parsedUser.isAdmin } });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    // No need to handle the case when user data is not found in local storage.
    // The initial state of { user: null, isAdmin: false } will handle that.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add an empty dependency array to run this effect only once on mount.

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
