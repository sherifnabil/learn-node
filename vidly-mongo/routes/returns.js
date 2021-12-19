const express = require('express');
const Joi = require('Joi');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const router = express.Router()
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const moment = require('moment');

// const validate = (validator) => {
//   return (req, res, next) => {
//     const { error } = validator(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//   }
// }

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if(!rental) return res.status(404).send('not found');

  if(rental.dateReturned) return res.status(400).send('Return alrady processed');
  rental.dateReturned = new Date();

  const rentalDays = moment().diff(rental.dateOut, 'days');
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne({ _id: rental.movie._id }, {
    $inc: {
      numberInStock: 1
    }
  });

  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi .objectId().required(),
    movieId: Joi .objectId().required(),
  });
  return schema.validate(req);
}

module.exports = router;