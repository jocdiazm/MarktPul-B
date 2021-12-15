const mongoose = require('mongoose')
const { config } = require('./index')

const URI = config.URI

async function connectDB() {
  console.log('uri', URI)
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
