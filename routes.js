const product = require('./api/product');
const user = require('./api/user');
const market = require('./api/market')

function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
   app.use('/api/market', market)
}

module.exports = routes;
