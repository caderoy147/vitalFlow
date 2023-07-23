/* this is basically a structure. we want o pass data that has predictable structure
// for example imong car gi disasemble
// window first then wheels then door and pag send alwyas
without this file walay structre so sa first windows,wheels,door but sa next basin ma door,wheels na ang format */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodRequestSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  bloodBagsNeeded: {
    type: Number,
    required: true,
  },
  signatureImage: {
    type: String, // Store the image as a Base64-encoded string
  },
}, { timestamps: true });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
