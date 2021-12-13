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
    timezone : {
      offset : String,
      description : String
    }
  },
  email : {
    type: String,
    required : true
  },
  login : {
    uuid : String,
    username : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    salt : String,
    md5 : String,
    sha1 : String,
    sha256 : String
  },
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
  nat : String
})

module.exports = mongoose.model('User', userSchema)
