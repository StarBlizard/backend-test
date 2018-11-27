const path                   = require('path');
const { passport }           = require(path.join(process.env.PWD, '/services/passport'));
const { app }                = require(path.join(process.env.PWD, '/services/server'));

// Controllers
const { alive, index, home } = require('./controllers/main');
const cartController         = require('./controllers/cart');
const productController      = require('./controllers/products');

const authController         = require('./controllers/auth');
const isAuthenticated        = require('./middleware/isAuthenticated');

// WatchDog
app.get('/alive', alive);

// Views
app.get('/', index);
app.get('/home', isAuthenticated, home);
app.get('/alive', alive);

// Auth
app.post('/login'   , passport.authenticate('local'), authController.granted);
app.post('/register', authController.register);
app.get('/granted' , authController.granted);
app.get('/logout'   , authController.logout);

// Cart
app.post('/addCartProduct',    isAuthenticated, cartController.add);
app.post('/removeCartProduct', isAuthenticated, cartController.removeProduct);
app.get('/cleanCart',         isAuthenticated, cartController.clean);
app.get('/getCartProducts',    isAuthenticated, cartController.get);

// Products
app.post('/addProduct', isAuthenticated, productController.add);
app.get('/getProducts', isAuthenticated, productController.get);
