const Logger = require('./lib/logger');

require('./services/configuration').init();
require('./services/database').init();
require('./services/passport').init();
require('./services/server').init();

require('./app/routes');
