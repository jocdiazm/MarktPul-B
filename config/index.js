require('dotenv').config();

const config = {
  URI: process.env.DB_URI,
  PORT: process.env.PORT,
};

module.exports = {
  config,
};
