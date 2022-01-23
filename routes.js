const product = require('./api/product');
const user = require('./api/user');
<<<<<<< HEAD
const market = require('./api/market')
const payment = require('./api/payment');

function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
   app.use('/api/market', market)
   app.use('/api/payments', payment);
=======
const market = require('./api/market');
const authLocal = require('./auth/local');
function routes(app) {
  app.use('/api/product', product);
  app.use('/api/user', user);
  app.use('/api/market', market);
  app.use('/auth/local', authLocal);
>>>>>>> 3bc54854d2016439d48ecd34da39d6643767699a
}

module.exports = routes;
