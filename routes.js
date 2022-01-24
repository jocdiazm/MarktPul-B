const product = require('./api/product');
const user = require('./api/user');
const market = require('./api/market')
const upload = require('./api/upload')
const payment = require('./api/payment');
const authLocal = require('./auth/local');

function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
   app.use('/api/market', market)
   app.use('/api/upload', upload)
   app.use('/api/payments', payment);
   app.use('/auth/local', authLocal);
}

module.exports = routes;
