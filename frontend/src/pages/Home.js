import { useEffect, useState }from "react"

// components
import BloodRequestDetails from '../components/BloodRequestDetails'
import BloodRequestForm from '../components/BloodRequestForm'


const Home = () => {
  const [bloodRequests, setBloodRequests] = useState(null)


  useEffect(()=>{
    const fetchBloodRequests = async () => {
      const response = await fetch('/api/bloodRequests')
      const json = await response.json()

      if(response.ok){
        setBloodRequests(json)
      }
    }

    fetchBloodRequests()
    
  }, []) // empty array so that is dosent keep on searching for blood, only refreash


  return (
    <div class="home">
      <div class="bloodRequests">
        {bloodRequests && bloodRequests.map((bloodRequest) => (
          <BloodRequestDetails key={bloodRequest._id} bloodRequest={bloodRequest} />
        ))}
      </div>
      <BloodRequestForm/>
    </div>
  )
}

export default Home 