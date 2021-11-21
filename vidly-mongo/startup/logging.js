const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  // throw new Error('Something Failed during startup.');
  // const p = Promise.reject(new Error('Something Failed Miserably!'));
  // p.then(r => console.log('Done'));
  process.on('unhandledRejection', (ex)  =>  {
    winston.exceptions.handle(new winston.transports.File({ filename: 'unhandledExceptions.log'}))
    // process.exit(1);
    throw ex;
  });

  process.on('uncaughtException', (ex)  =>  {
    console.log('WE GOT AN UNCAUGHT EXCEPTION!!!', ex);
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    winston.add(new winston.transports.File, { filename: 'error.log'})
    winston.add(new winston.transports.MongoDB, { db: 'mongodb://localhost/playground', level: 'info'})
  });
}