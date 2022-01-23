require('dotenv').config();

const config = {
  URI: process.env.DB_URI,
  PORT: process.env.PORT,
  secrets:{
    session: process.env.SECRET_KEY,
  },
  expiresIn: '1h',
  userRoles: ['user', 'admin']
};

module.exports = {
  config,
};
