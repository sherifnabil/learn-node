const winston = require('winston');

module.exports = function(error, req, res, next) {

  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error', message: error }),
    ],
  });

  logger.error("Error in 127.0.0.1 - there's no place like home", error);

  return  res.status(500).send('Something failed.')
}