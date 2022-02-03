const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UserSchema } = require('./user.schema');
const { Schema } = mongoose;
const config = require('../../config');

const CreditCardSchema = new mongoose.Schema(
  {
    expMonth: {
      type: String,
      required: true,
      trim: true,
    },
    expYear: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mask: {
      type: String,
      required: true,
      trim: true,
    },
    tokenId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const BillingSchema = new mongoose.Schema(
  {
    creditCards: [CreditCardSchema],
    customerId: String,
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    gender: String,
    name: {
      title: String,
      first: String,
      last: String,
    },
    location: {
      address: String,
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
    // picture: {
    //   large: String,
    //   medium: String,
    //   thumbnail: String,
    // },
    picture: String,
    country: String,
    role: {
      type: String,
      default: 'user',
      enum: config.userRoles,
      required: true,
    },
    marketId: [
      {
        type: String,
        ref: 'Market',
        required: true,
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    billing: BillingSchema,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    throw error;
  }
};

userSchema.virtual('profile').get(function () {
  const { email, role, _id, username } = this;
  return { role, email, _id, username };
});

module.exports = mongoose.model('User', userSchema);
