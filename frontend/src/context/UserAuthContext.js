// UserAuthContext.js
import { createContext, useReducer, useEffect } from 'react';

export const UserAuthContext = createContext();

export const userAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, isAdmin: false };
    case 'LOGOUT':
      return { user: null, isAdmin: false };
    default:
      return state;
  }
};

export const UserAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userAuthReducer, {
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    // Your login logic for the user, parsing data from localStorage, etc.
  }, []);

  return (
    <UserAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserAuthContext.Provider>
  );
};
