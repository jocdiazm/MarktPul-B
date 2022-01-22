const User = require('./user.model');
/**
 * Get all users
 * @returns all users
 */

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}
/**
 * Get user by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns user
 */
async function getUserById(id) {
  try {
    const user = await User.findById(id).populate('marketId');
    return user;
  } catch (error) {
    throw error;
  }
}
/**
 * Create a new user
 * @param {Object} user User to create
 * @returns User created
 */
async function createUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
    /* const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser; */
  } catch (error) {
    throw error;
  }
}
/**
 * Update a user
 * @param {string} id  Indentifier of the note to be updated
 * @returns User updated
 */
async function updateUser(id, user) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}
/**
 * Delete a user
 * @param {string} id  Indentifier of the note to be updated
 * @returns User deleted
 */
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
async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
}
async function ValidateUserEmail(email) {
  try {
    const isMatch = await User.findOne({ email });
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
async function ValidateUserName(username) {
  try {
    const isMatch = await User.findOne({ username });
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  findOneUser,
  ValidateUserEmail,
  ValidateUserName,
};
