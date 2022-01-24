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
  // address: String,
  // city: String,
  // country: String,
  // moreDetails: String,
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
  category: String,
  image: String,
  place: String,
});

module.exports = mongoose.model('Market', MarketSchema);
