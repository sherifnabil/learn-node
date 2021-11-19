const winston = require('winston');
require('express-async-errors');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

process.on('uncaughtException', (ex)  =>  {
  console.log('WE GOT AN UNCAUGHT EXCEPTION!!!');
});

// when export env variable run project name _ your variable as next export vidly_jwtPrivateKey=mySecureKey
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey was not defined.');
  process.exit(1);
}

throw new Error('Something Failed during startup.');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected....'))
  .catch((e) => console.log('Error ', e))


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));