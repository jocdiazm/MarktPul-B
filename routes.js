const product = require('./api/product');
const user = require('./api/user');
const market = require('./api/market')
const upload = require('./api/upload')

function routes(app) {
   app.use('/api/product', product);
   app.use('/api/user', user)
   app.use('/api/market', market)
   app.use('/api/upload', upload)
}

module.exports = routes;
