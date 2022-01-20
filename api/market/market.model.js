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
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postcode: String,
    coordinates: {
      latitude: String,
      longitude: String,
    },
    timezone: String,
  },
  virtual: {
    type: Boolean,
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
