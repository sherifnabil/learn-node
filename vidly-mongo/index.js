const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/logging')(); // put first just incase in loading other modules would log that error and terminate the process
require('./startup/routes')(app);
require('./startup/db')();

// when export env variable run project name _ your variable as next export vidly_jwtPrivateKey=mySecureKey
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey was not defined.');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));