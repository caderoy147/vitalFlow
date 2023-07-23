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
const createBloodRequest = async (req, res) => {
  const { _id: ownerId } = req.user;
  const {
    patientName,
    age,
    gender,
    bloodType,
    doctorName,
    hospital,
    citizenship,
    bloodBagsNeeded,
    signatureImage,
  } = req.body;

  let emptyFields = [];

  if (!patientName) {
    emptyFields.push('patientName');
  }
  if (!age) {
    emptyFields.push('age');
  }
  if (!gender) {
    emptyFields.push('gender');
  }
  if (!bloodType) {
    emptyFields.push('bloodType');
  }
  if (!doctorName) {
    emptyFields.push('doctorName');
  }
  if (!hospital) {
    emptyFields.push('hospital');
  }
  if (!citizenship) {
    emptyFields.push('citizenship');
  }
  if (!bloodBagsNeeded) {
    emptyFields.push('bloodBagsNeeded');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in missing fields in red', emptyFields });
  }

  // Add document to the DB. This is a function that adds the blood request to the database. It is called in the routes folder.
  try {
    const bloodRequest = await BloodRequest.create({
      owner: ownerId,
      patientName,
      age,
      gender,
      bloodType,
      doctorName,
      hospital,
      citizenship,
      bloodBagsNeeded,
      signatureImage,
    });

    res.status(200).json(bloodRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// DELETE a bloodRequest 
const deleteBloodRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'This blood request does not exist' });
  }

  try {
    // Find the blood request by its ID
    const bloodRequest = await BloodRequest.findById(id);

    if (!bloodRequest) {
      return res.status(400).json({ error: 'This blood request does not exist' });
    }

    // Check if the authenticated user is the owner of the blood request
    if (bloodRequest.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only delete your request' });
    }

    // Only allow deletion if the user is the owner of the blood request
    await BloodRequest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blood request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};





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
