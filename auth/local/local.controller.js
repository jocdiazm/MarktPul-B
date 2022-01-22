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
module.exports = {
  loginUSerHandler,
};
