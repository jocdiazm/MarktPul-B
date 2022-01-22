const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UserSchema } = require('./user.schema');
const { Schema } = mongoose;
const config = require('../../config');
const userSchema = new Schema(
  {
    gender: String,
    name: {
      title: String,
      first: String,
      last: String,
    },
    location: {
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
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      trim: true,
    },
    username: {
      type: String,
      lowercase: true,
      index: true,
      uppercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    /* confirmPassword: {
      type: String,
      required: true,
      trim: true,
    }, */
    salt: String,
    md5: String,
    sha1: String,
    sha256: String,
    dob: {
      date: Date,
      age: Number,
    },
    registered: {
      date: Date,
      age: Number,
    },
    phone: String,
    cell: String,
    picture: {
      large: String,
      medium: String,
      thumbnail: String,
    },
    nat: String,
    role: {
      type: String,
      default: 'user',
      enum: config.userRoles,
      required: true,
    },
    marketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Market',
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);
//hook de monggose cada vez que se guarde un usuario
userSchema.pre('save', async function (next) {
  //definimos la variable user que representara a mi mismo
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }
    //generamos una cadena aleatoria
    const salt = await bcrypt.genSalt(10);
    //generamos el hash
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    //generamos el password hash
  } catch (error) {
    next(error);
  }
});

//comparamos
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    //comparamos el password que nos llegue y compara con el campo password
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    throw error;
  }
};

//virtual
userSchema.virtual('profile').get(function () {
  const { email, role } = this;
  return { role, email };
});

module.exports = mongoose.model('User', userSchema);
