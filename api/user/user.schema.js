const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  uid : Number,
  name : String,
  username : String,
  address : String,
  location : {
    lat : String,
    lng : String
  },
  city : String,
  password : String,
  birthday : Date,
  profilePic : String,
})

module.exports = mongoose.model('User', userSchema)
