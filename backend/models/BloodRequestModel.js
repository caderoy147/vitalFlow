/* this is basically a structure. we want o pass data that has predictable structure
// for example imong car gi disasemble
// window first then wheels then door and pag send alwyas
without this file walay structre so sa first windows,wheels,door but sa next basin ma door,wheels na ang format */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bloodRequestSchema = new Schema({
  patientName: {
    type: String,
    required: true
  }, 
  bloodType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
  }
}, { timestamps: true })


module.exports = mongoose.model('BloodRequest',bloodRequestSchema)

