import { useEffect }from "react"
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import BloodRequestDetails from '../components/BloodRequestDetails'
import BloodRequestForm from '../components/BloodRequestForm'


const Home = () => {
  const {bloodRequests, dispatch} = useBloodRequestsContext()
  const {user} = useAuthContext()


  useEffect(()=>{
    const fetchBloodRequests = async () => {
      const response = await fetch('/api/bloodRequests',{
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_BLOODREQUESTS', payload: json})
      }
    }

    if (user) {
      fetchBloodRequests()
    }
 
  }, [dispatch, user]) //depedency array ng dispatch if that gets eddited something happens, react things


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