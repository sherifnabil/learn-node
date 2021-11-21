const config = require('config');

module.exports = function() {
  // when export env variable run project name _ your variable as next export vidly_jwtPrivateKey=mySecureKey
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey was not defined.');
  }
}