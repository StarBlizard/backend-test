const nconf   = require('nconf');
const Logger  = require('../lib/logger');
const winston = require('winston');
const path    = require('path');

module.exports.init = function(){
  Logger.info('[Config Service] : Start');

  // Setup nconf to use (in-order):
  //   1. Command-line arguments
  //   2. Environment variables
  nconf.argv().env();

  // Get current environment variable
  let environment = nconf.get('NODE_ENV') || 'local';

  // Load configuration file
  nconf.file({ file: `config/env/${environment}.json` });
};
