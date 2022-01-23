const product = require('./api/product');
const user = require('./api/user');
const market = require('./api/market')
const payment = require('./api/payment');

function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
   app.use('/api/market', market)
   app.use('/api/payments', payment);
}

module.exports = routes;
