const BloodRequestDetails = ({ bloodRequest }) => {
  return(
    <div className="blood-request-details">
      <h4>{bloodRequest.patientName}</h4>
      <p><strong>Blood Type: </strong>{bloodRequest.bloodType}</p>
      <p><strong>location: </strong>{bloodRequest.location}</p>
      <p><strong>Phone Number: </strong>{bloodRequest.phoneNumber}</p>
      <p>{bloodRequest.createdAt}</p>
    </div>
  )
}

export default BloodRequestDetails