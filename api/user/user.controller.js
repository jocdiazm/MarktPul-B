const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} = require('./user.service');
const { createMarket } = require('../market/market.service');
const { signToken } = require('../auth/auth.services');
const User = require('./user.model');

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();

    if (users.length == 0) {
      return res.status(404).json({ message: `no users found` });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createUserHandler(req, res) {
  try {
    const { username } = req.body;
    const marketData = {
      title: `el mercado de ${username}`,
      description: '',
      organizer: username,
    };
    const market = await createMarket(marketData);

    const { _id } = market;
    const newUser = {
      ...req.body,
      marketId: _id,
    };
    const user = await createUser(newUser);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function loginUSerHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    const token = signToken(user.profile);
    res.status(200).json({ JWT: token });
  } catch (error) {
    res.status(400).json(error);
  }
}
module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUSerHandler,
};
