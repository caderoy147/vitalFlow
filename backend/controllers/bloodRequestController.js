const BloodRequest = require('../models/BloodRequestModel')

// GET all bloodRequest 



// GET a single bloodRequest 




// CREATE a  new bloodRequest 
const createBloodRequest = async (req,res) => {
  const {patientName, bloodType, location, phoneNumber} = req.body


  // add doc to DB this is a function that adss blood requ to db it is called in routes folder
  try{
    const bloodRequest = await BloodRequest.create({patientName, bloodType, location, phoneNumber})
    res.status(200).json(bloodRequest)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}


// DELETE a bloodRequest 




// UPDATE a bloodRequest


//exports of the created function this is so that other libs can use it

module.exports = {
  createBloodRequest
}
