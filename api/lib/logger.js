const winston = require('winston');

let Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ timestamp: true })
  ],
  exitOnError: false
});

module.exports = Logger;
