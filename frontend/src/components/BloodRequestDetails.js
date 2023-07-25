import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BloodRequestDetails = ({ bloodRequest }) => {
  const { dispatch } = useBloodRequestsContext()
  const { user } = useAuthContext()

  const navigate = useNavigate();

  const handleClick = async() =>{
    if (!user) {
      return
    }

    const response = await fetch('/api/bloodRequests/' + bloodRequest._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
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
      <p><strong>Location: </strong>{bloodRequest.location}</p>
      <p><strong>Phone Number </strong>:+63{bloodRequest.phoneNumber}</p>
      <p>{formatDistanceToNow(new Date(bloodRequest.createdAt), { addSuffix: true })}</p>
      <Link to={`/donate/${bloodRequest._id}`}>Go to Blood Donation Form</Link>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default BloodRequestDetails
//hi