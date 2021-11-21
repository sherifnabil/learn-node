const winston = require('winston');
require('express-async-errors');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();

process.on('uncaughtException', (ex)  =>  {
  console.log('WE GOT AN UNCAUGHT EXCEPTION!!!', ex);
  // winston.add(new winston.transports.File({ filename: 'error.log', level: 'error', message: "WE GOT AN UNCAUGHT EXCEPTION" }))

});

// when export env variable run project name _ your variable as next export vidly_jwtPrivateKey=mySecureKey
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey was not defined.');
  process.exit(1);
}

// throw new Error('Something Failed during startup.');

// const p = Promise.reject(new Error('Something Failed Miserably!'));
// p.then(r => console.log('Done'));

process.on('unhandledRejection', (ex)  =>  {
  winston.exceptions.handle(new winston.transports.File({ filename: 'unhandledExceptions.log'}))
  // process.exit(1);
  throw ex;
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));