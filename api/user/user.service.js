const get = require('lodash/get');
const User = require('./user.model');

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).populate('marketId');
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, user) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

async function addBillingCards(user, card) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customer = {
    billing: {
      creditCards: creditCards.concat(card),
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });

  return updatedUser;
}

async function addBillingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', []);

  const customer = {
    billing: {
      creditCards,
      customerId,
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });

  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  addBillingCards,
  addBillingCustomerId
};
