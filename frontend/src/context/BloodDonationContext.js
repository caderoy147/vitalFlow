// src/hooks/useBloodDonationsContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

export const BloodDonationsContext = createContext();

const bloodDonationsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOOD_DONATION":
      return {
        ...state,
        bloodDonations: [...state.bloodDonations, action.payload],
      };
    default:
      return state;
  }
};

export const BloodDonationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bloodDonationsReducer, {
    bloodDonations: [],
  });

  // Add any additional initialization logic if required

  return (
    <BloodDonationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BloodDonationsContext.Provider>
  );
};
