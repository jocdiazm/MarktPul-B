const { findOneUser } = require('../../api/user/user.service');
const { signToken } = require('../auth.services');

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
  validateEmailHandler,
};
