const EventEmitter = require('events')

class Logger extends EventEmitter {
  log(msg) {
    console.log(msg);
    this.emit('callMe', {msg:'hhhhhhhhhhhhhhhh'})
  }
}

module.exports = Logger