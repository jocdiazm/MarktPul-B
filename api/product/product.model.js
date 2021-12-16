const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  price : {
    type: Number,
    required: true,
  },
  images : [],
  title : {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true,
  },
  stock: Number,
  thumbnail: {
    large: String,
    medium: String,
    thumbnail: String,
  },
  category: [],
  date: {
    pubdate: Date,
    enddate: Date,
  },
})

module.exports = mongoose.model('Product', productSchema)
