import { useState } from "react"
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext"
import { useAuthContext } from '../hooks/useAuthContext'


const BloodRequestForm = () => {
  const { dispatch } = useBloodRequestsContext()
  const { user } = useAuthContext()

  const [patientName, setPatientName] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [location, setLocation] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if (!user) {
      setError('You must be logged in')
      return
    }

    const bloodRequest = {patientName, bloodType, location, phoneNumber}

    const response = await fetch('/api/bloodRequests',{
      method: 'POST',
      body: JSON.stringify(bloodRequest),
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setPatientName('')
      setBloodType('')
      setLocation('')
      setPhoneNumber('')
      setError(null)
      setEmptyFields([])
      console.log('new blood request added', json)
      dispatch({type:'CREATE_BLOODREQUEST', payload: json})
    }
  }
 
  return(
    <form className="create" onSubmit={handleSubmit}>
      <h3>Enter A Blood Request</h3>

      <label>Patient Name:</label>
      <input 
       type="text"
       onChange={(e) => setPatientName(e.target.value)}
       value={patientName}
       className={emptyFields.includes('patientName') ? 'error' : ''}
      />

      <label>Blood Type:</label>
      <select
        onChange={(e) => setBloodType(e.target.value)}
        value={bloodType}
        className={`select-dropdown ${emptyFields.includes('bloodType') ? 'error' : ''}`}
      >
        <option value="">Select a blood type</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <label>Location:</label>
      <input 
       type="text"
       onChange={(e) => setLocation(e.target.value)}
       value={location}
       className={emptyFields.includes('location') ? 'error' : ''}
      />


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'initial', justifyContent: 'flex-start' }}>
        <label style={{ marginBottom: '5px' }}>Phone Number:</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '37px', top: '50%', transform: 'translateY(-70%)' }}>+63</span>
          <input
            type="text"
            maxLength={10} // Added maxLength attribute to limit characters
            onChange={(e) => {
              const input = e.target.value;
              const phoneNumber = input.slice(0, 10); // Limit the input to first 10 characters
              setPhoneNumber(phoneNumber);
            }}
            value={phoneNumber}
          />
        </div>
      </div>



      <button>Add Blood Request</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BloodRequestForm