// routes api for blood requests

const express = require('express')

//from the bloodrequest controller the functions of these routes
const {
  createBloodRequest,
  getBloodRequests,
  getSingleBloodRequest,
  deleteBloodRequest,
  updateBloodrequest
} = require('../controllers/bloodRequestController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

//this route will get all the blood request table form
router.get('/', getBloodRequests)

//GET/READ a single blood request
router.get('/:id', getSingleBloodRequest)

//CREATE a new bloodRequest so POST new request
router.post('/', createBloodRequest)

//DELETE a bloodRequest
router.delete('/:id', deleteBloodRequest)


//UPDATE a bloodRequest
router.patch('/:id', updateBloodrequest)


//router.get('/hello', () => {}) create routes like this


module.exports = router

