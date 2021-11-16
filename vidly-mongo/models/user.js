const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity");

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
}));

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 5,
      max: 30,
      lowerCase: 2,
      upperCase: 1,
      numeric: 1,
      symbol: 5,
      requirementCount: 2,
    }),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;