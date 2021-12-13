const User = require('./user.schema');
/**
 * Get all users
 * @returns all users
 */

async function getAllUsers (){
    try{
        const users=await User.find();
        return users;
    } catch(error){
        throw error;
    }
}
/**
 * Get user by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns user
 */
async function getUserById(){
    try {
        const user= await User.findById(id);
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
async function createUser(user){
    try {
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}
/**
 * Update a user
 * @param {string} id  Indentifier of the note to be updated
 * @returns User updated
 */
async function updateUser(id,user){
    try {
        const updatedUser= await User.findByIdAndUpdate(id,user);
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
async function deleteUser(id){
    try {
        const deletedUser= await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
