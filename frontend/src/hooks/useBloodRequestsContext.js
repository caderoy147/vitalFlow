import { BloodRequestsContext } from "../context/BloodRequestContext";
import { useContext } from "react";

export const useBloodRequestsContext = () => {
  const context = useContext(BloodRequestsContext)

  if (!context){
    throw Error ('useBloodRequestContext must be used inside a BloodRequestsContextProvider')
  }

  return context
}