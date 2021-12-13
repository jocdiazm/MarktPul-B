const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  uid : Number,
  price : Number,
  name : String,
  stock : Number,
  category : String,
})

module.exports = mongoose.model('Product', productSchema)
