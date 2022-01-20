const jsonwebtoken = require('jsonwebtoken');
const { getUserByEmail } = require('../user/user.service');
const config = {
  secrets: {
    session: 'S0p0rt31',
  },
  expiresIn: '1h',
};
function signToken(payload) {
  //creamos el token
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });
  return token;
}
async function isAuthenticated(req, res, next) {
  //obtenemos el token de autorizacion
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  const [, token] = authHeader.split(' ');
  //validamos el token
  const payload = await validateToken(token);
  if (!payload) {
    return res.status(401).json({
      message: 'unauthorized',
    });
  }
  //atach user to request
  const user = await getUserByEmail(payload.email);
  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  req.user = user;
  next();
}
async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}
async function hasRole(req, res, next, role) {
  const { user } = req;
  if (user.role !== role) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }
  next();
}
module.exports = {
  signToken,
  isAuthenticated,
  hasRole,
};
