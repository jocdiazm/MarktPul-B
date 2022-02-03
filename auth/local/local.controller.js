const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { findOneUser, updateUser } = require('../../api/user/user.service');
const { signToken } = require('../auth.services');
const { sendEmail } = require('../../utils/email');

async function loginUSerHandler(req, res) {
  const { email, password } = req.body;
  try {
    /* buscamos el usuario y si no encontramos nos retornara un mensaje de usuario no encontrado */
    const user = await findOneUser({ email });
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
    //creamos el token
    const token = signToken(user.profile);
    res.status(200).json({ JWT: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function recoverPassHandler(req, res) {
  const { email } = req.body;
  try {
    const user = await findOneUser({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    } else {
      user.passwordResetExpires = Date.now() + 3600000 * 24; // 24 hour
      const newUser = await updateUser(user._id, user);
      const emailHTML = {
        to: newUser.email,
        subject: '¡Recuperacion de cuenta en Marktpul!',
        template_id: 'd-7463fbfb5394441b9b8bab2ef71d1458',
        dynamic_template_data: {
          username: newUser.username,
          url: `https://marktpulf.netlify.app/resetPass/${newUser.passwordResetToken}`,
        },
      };
      sendEmail(emailHTML);
      return res.status(200).json(user.profile);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function resetPassHandler(req, res) {
  const { hash } = req.body;
  try {
    const user = await findOneUser({ passwordResetToken: hash });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    if (Date.now() >= user.passwordResetToken) {
      return res.status(400).json({
        message: 'Token Expired',
      });
    }
    return res.status(200).json({ email: user.email });
  } catch (error) {
    return res.status(400).json({
      message: 'User not found',
    });
  }
}

async function updatePassHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOneUser({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    const newUser = await updateUser(user._id, user);
    return res.status(200).json({ email: newUser.email });
  } catch (error) {
    return res.status(400).json({
      message: 'User not found',
    });
  }
}
async function validateEmailHandler(req, res) {
  const { hash } = req.body;
  try {
    const user = await findOneUser({ passwordResetToken: hash });
    if (!user) {
      return res.status(404).json({
        message: 'Invalid token',
      });
    }
    if (Date.now() >= user.passwordResetToken) {
      return res.status(404).json({
        message: 'Token Expired',
      });
    }

    user.active = true;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    //creamos el token
    const token = signToken(user.profile);
    return res.status(200).json({ JWT: token });
  } catch (error) {
    res.status(400).json({
      errror: error,
    });
  }
}

module.exports = {
  loginUSerHandler,
  recoverPassHandler,
  resetPassHandler,
  updatePassHandler,
  validateEmailHandler,
};
