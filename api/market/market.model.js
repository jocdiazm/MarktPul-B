const mongoose = require('mongoose');
const { Schema } = mongoose;

const MarketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  organizer: {
    type: String,
  },
  place:{
    address: String,
    city: String,
    country: String,
    moreDetails: String,
  },
  category: String,
  image: String,
  coordinates: {
    latitude: String,
    longitude: String,
  },
  timezone: String,
  virtual: {
    type: String,
  },
  thumbnail: {
    large: String,
    medium: String,
    thumbnail: String,
  },
});

module.exports = mongoose.model('Market', MarketSchema);
