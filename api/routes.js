const { passport }           = require('./services/passport');
const { app }                = require('./services/server');
const { alive, index, home } = require('./controllers/main');

const authController         = require('./controllers/auth');
const isAuthenticated        = require('./middleware/isAuthenticated');

// WatchDog
app.get('/alive', alive);

// Views
app.get('/', index);
app.get('/home', isAuthenticated, home);

// Auth
app.post('/login'   , passport.authenticate('local'), authController.granted);
app.post('/register', authController.register);
app.get('/logout'   , authController.logout);
