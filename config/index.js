require('dotenv').config()

const config = {
  URI: process.env.DB_URI,
}

module.exports = {
  config
}
