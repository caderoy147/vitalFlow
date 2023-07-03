const BloodRequest = require('../models/BloodRequestModel')
/*this will allow to check the id if it is valid mongo id. if this isnot done finbyid will check any number resulting in error */
const mongoose = require('mongoose')

// GET all bloodRequest 
const getBloodRequests = async (req,res)=>{
  const bloodRequests = await BloodRequest.find({}).sort({createdAt: -1})

  res.status(200).json(bloodRequests)
}


// GET a single bloodRequest 
const getSingleBloodRequest = async (req,res)=>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'this blood Request dosent exists'})
  }
  
  const singleBloodRequest = await BloodRequest.findById(id)

  if (!singleBloodRequest){
    return res.status(404).json({error: 'this blood Request dosent exists'})
  }

  res.status(200).json(singleBloodRequest)
}



// CREATE a  new bloodRequest 
const createBloodRequest = async (req,res) => {
  const {patientName, bloodType, location, phoneNumber} = req.body

  let emptyFields = []

  if(!patientName) {
    emptyFields.push('patientName')
  }
  if(!bloodType) {
    emptyFields.push('bloodType')
  }
  if(!location) {
    emptyFields.push('location')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in missing fields in red', emptyFields})
  }


  // add doc to DB this is a function that adss blood requ to db it is called in routes folder
  try{
    const bloodRequest = await BloodRequest.create({patientName, bloodType, location, phoneNumber})
    res.status(200).json(bloodRequest)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}


// DELETE a bloodRequest 
const deleteBloodRequest = async (req,res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'this blood Request dosent exists'})
  }
  
  const bloodRequest = await BloodRequest.findOneAndDelete({_id: id}) 
  //_id is mongo while id is from client, this code compares. if match then delete

  if (!bloodRequest){
    return res.status(400).json({error: 'this blood Request dosent exists'})
  }

  res.status(200).json(bloodRequest)
}



// UPDATE a bloodRequest
const updateBloodrequest = async (req,res) =>
{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'this blood Request dosent exists'})
  }
  
  const bloodRequest = await BloodRequest.findOneAndUpdate({_id: id},{
    ...req.body
  }) 
  //_id is mongo while id is from client, this code compares. if match then delete

  if (!bloodRequest){
    return res.status(400).json({error: 'this blood Request dosent exists'})
  }

  res.status(200).json(bloodRequest)
}




//exports of the created function this is so that other libs can use it

module.exports = {
  getBloodRequests,
  getSingleBloodRequest,
  createBloodRequest,
  deleteBloodRequest,
  updateBloodrequest
}
