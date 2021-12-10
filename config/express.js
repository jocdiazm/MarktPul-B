const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

function connectDB(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
}

module.exports = connectDB;