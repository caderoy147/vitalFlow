// AdminAuthContext.js
import { createContext, useReducer, useEffect } from 'react';

export const AdminAuthContext = createContext();

export const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, isAdmin: true };
    case 'LOGOUT':
      return { user: null, isAdmin: false };
    default:
      return state;
  }
};

export const AdminAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, {
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    // Your login logic for the admin, parsing data from localStorage, etc.
  }, []);

  return (
    <AdminAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
