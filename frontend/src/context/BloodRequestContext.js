import { createContext, useReducer } from "react";

export const BloodRequestsContext = createContext()  //brand new context to export since other files need this func


export const bloodRequestsReducer = (state, action) =>{
  switch (action.type){
    case 'SET_BLOODREQUESTS':
      return{
        bloodRequests: action.payload
      }
    case 'CREATE_BLOODREQUEST':
      return{
        bloodRequests: [action.payload, ...state.bloodRequests]
      }
    case 'DELETE_BLOODREQUEST':
      return{
        bloodRequests: state.bloodRequests.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}


export const BloodRequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bloodRequestsReducer, {
    bloodRequests: null
  })

  //dispatch({type: '', payload: [{},{}]}) // first pro descibre,sceond prop payload

  return(
    <BloodRequestsContext.Provider value={{...state, dispatch}}>
      { children }
    </BloodRequestsContext.Provider>
  )
}




