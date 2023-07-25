const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method to create a new admin
adminSchema.statics.createAdmin = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ email, password: hash });

  return admin;
};

// static method to find an admin by email and compare password
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const admin = await this.findOne({ email });
  if (!admin) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
