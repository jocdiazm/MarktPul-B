const crypto = require('crypto');
const { sendEmail } = require('../../utils/email');
const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  ValidateUserEmail,
  ValidateUserName,
} = require('./user.service');
const { createMarket } = require('../market/market.service');
const User = require('./user.model');

async function getAllUsersHandler(req, res) {
  console.log(
    '🚀 ~ file: user.controller.js ~ line 17 ~ getAllUsersHandler ~ req',
    req.user,
  );
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
    const { username, email } = req.body;
    const matchUserEmail = await ValidateUserEmail(email);
    if (matchUserEmail) {
      return res.status(403).json({
        message: 'used email',
      });
    }
    const matchUserName = await ValidateUserName(username);
    if (matchUserName) {
      return res.status(403).json({
        message: 'used username',
      });
    }
    const marketData = {
      title: `el mercado de ${username}`,
      description: '',
      organizer: username,
      image:
        'https://res.cloudinary.com/db3njhxi0/image/upload/v1639700587/Markt-Pul/Markets/mercadoPorDefecto_aukqrf.jpg',
      virtual: true,
    };
    const market = await createMarket(marketData);

    const { _id } = market;
    const newUser = {
      ...req.body,
      marketId: _id,
    };

    try {
      const hash = crypto
        .createHash('sha256')
        .update(newUser.email)
        .digest('hex');

      newUser.passwordResetToken = hash;
      newUser.passwordResetExpires = Date.now() + 3600000 * 24; // 24 hour

      const user = await createUser(newUser);

      const email = {
        to: user.email,
        subject: '¡Activa tu cuenta en Marktpul!',
        template_id: 'd-7300e5c8c797411991fc03c9e2358927',
        dynamic_template_data: {
          username: user.username,
          url: `http://localhost:3000/activate/${hash}`,
        },
      };
      sendEmail(email);
      return res.status(201).json(user.profile);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }

    // return res.status(201).json(user.profile);
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
async function getUserMeHandler(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(
      '🚀 ~ file: user.controller.js ~ line 142 ~ getUserMeHandler ~ error',
      error,
    );
    return res.status(400).json({ error: error.message });
  }
}
async function getUserMeHandler(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(
      '🚀 ~ file: user.controller.js ~ line 142 ~ getUserMeHandler ~ error',
      error,
    );
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserMeHandler,
};
