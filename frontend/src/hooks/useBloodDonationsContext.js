import { BloodDonationsContext } from "../context/BloodDonationContext";
import { useContext } from "react";

export const useBloodDonationsContext = () => {
  const context = useContext(BloodDonationsContext);

  if (!context) {
    throw new Error(
      "useBloodDonationsContext must be used inside a BloodDonationsContextProvider"
    );
  }

  return context;
};
