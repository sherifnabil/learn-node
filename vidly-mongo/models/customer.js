const mongoose = require('mongoose')
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  isGold: {
    type: Boolean,
    default: false,
  }
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).max(15).required(),
    isGold: Joi.boolean()
  });
  return schema.validate(customer);
}

const Customer = mongoose.model('Customer', customerSchema)

exports.Customer = Customer;
exports.validate = validateCustomer;