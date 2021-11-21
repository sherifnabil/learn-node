const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected....'))
}