const product = require('./api/product');
const user = require('./api/user');
const market = require('./api/market');
const authLocal = require('./auth/local');
function routes(app) {
  app.use('/api/product', product);
  app.use('/api/user', user);
  app.use('/api/market', market);
  app.use('/auth/local', authLocal);
}

module.exports = routes;
