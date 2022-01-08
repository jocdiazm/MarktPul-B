const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  gender : String,
  name : {
    title : String,
    first : String,
    last : String
  },
  location : {
    street : String,
    city : String,
    state : String,
    country : String,
    postcode : String,
    coordinates : {
      latitude : String,
      longitude : String
    },
    timezone : String,
  },
  email : {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    trim: true,
  },
  username : {
    type: String, lowercase: true,
    index: true,
    uppercase: true,
  },
  password : {
    type : String,
    required : true,
    trim: true,
  },
  salt : String,
  md5 : String,
  sha1 : String,
  sha256 : String,
  dob : {
    date : Date,
    age: Number
  },
  registered : {
    date : Date,
    age : Number
  },
  phone : String,
  cell : String,
  picture : {
    large : String,
    medium : String,
    thumbnail : String
  },
  nat : String,
  role: {
    type: String,
    default: 'user',
    required: true,
  },
  marketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Market',
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema)
