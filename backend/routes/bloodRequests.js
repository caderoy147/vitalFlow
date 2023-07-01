// routes api for blood requests

const express = require('express')

//from the bloodrequest controller the functions of these routes
const {
  createBloodRequest
} = require('../controllers/bloodRequestController')

const router = express.Router()

//this route will get all the blood request table form
router.get('/', (req, res) => {
  res.json({mssg: 'GET all bloodrequests'})
})

//get a single blood request
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single bloodrequest'})
})

//create a new bloodRequest so POST new request
router.post('/', createBloodRequest)

//DELETE a bloodRequest
router.delete('/:id', (req, res) => {
  res.json({mssg: 'Delete a bloodrequest'})
})

router.patch('/:id', (req, res) => {
  res.json({mssg: 'Update a bloodrequest'})
})


//router.get('/hello', () => {}) create routes like this


module.exports = router

