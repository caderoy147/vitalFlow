import { useEffect }from "react"
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext"

// components
import BloodRequestDetails from '../components/BloodRequestDetails'
import BloodRequestForm from '../components/BloodRequestForm'


const Home = () => {
  const {bloodRequests, dispatch} = useBloodRequestsContext()


  useEffect(()=>{
    const fetchBloodRequests = async () => {
      const response = await fetch('/api/bloodRequests')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_BLOODREQUESTS', payload: json})
      }
    }

    fetchBloodRequests()
   
 
  }, [dispatch]) //depedency array ng dispatch if that gets eddited something happens, react things


  return (
    <div className="home">
      <div className="bloodRequests">
        {bloodRequests && bloodRequests.map((bloodRequest) => (
          <BloodRequestDetails key={bloodRequest._id} bloodRequest={bloodRequest} />
        ))}
      </div>
      <BloodRequestForm/>
    </div>
  )
}

export default Home 