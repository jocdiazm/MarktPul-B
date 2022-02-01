const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  imageMain: String,
  images: [],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: Number,
  thumbnail: {
    large: String,
    medium: String,
    thumbnail: String,
  },
  category: String,
  date: {
    pubdate: Date,
    enddate: Date,
  },
  marketId: [
    {
      type: Array,
      ref: 'Market',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
