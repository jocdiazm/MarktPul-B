const product = require('./api/product');
const user = require('./api/user');
function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
}

module.exports = routes;
