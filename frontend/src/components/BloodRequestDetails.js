import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BloodRequestDetails = ({ bloodRequest }) => {
  const { dispatch } = useBloodRequestsContext()

  const handleClick = async() =>{
    const response = await fetch('/api/bloodRequests/' + bloodRequest._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type:'DELETE_BLOODREQUEST', payload:  json})
    }
  }

  return(
    <div className="blood-request-details">
      <h4>{bloodRequest.patientName}</h4>
      <p><strong>Blood Type: </strong>{bloodRequest.bloodType}</p>
      <p><strong>location: </strong>{bloodRequest.location}</p>
      <p><strong>Phone Number: </strong>{bloodRequest.phoneNumber}</p>
      <p>{formatDistanceToNow(new Date(bloodRequest.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default BloodRequestDetails