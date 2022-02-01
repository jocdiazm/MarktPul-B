const jsonwebtoken = require('jsonwebtoken');
const compose = require('composable-middleware');
const { getUserByEmail } = require('../api/user/user.service');
const { config } = require('../config');

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });
  return token;
}
function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    try {
      //obtenemos el token de autorizacion
      const authHeader = req.headers.authorization;
      console.log('entro en autenticacion');
      if (authHeader) {
        const [, token] = authHeader.split(' ');
        //validamos el token
        const payload = await validateToken(token);
        if (!payload) {
          console.log('token no valido');
          return res
            .status(401)
            .json({
              message: 'unauthorized',
            })
            .end();
        }
        //atach user to request
        const user = await getUserByEmail(payload.email);
        if (!user) {
          console.log('entra en no user');
          return res
            .status(401)
            .json({
              message: 'Unauthorized',
            })
            .end();
        }
        req.user = user;
        next();
        return null;
      } else {
        return res
          .status(401)
          .json({
            message: 'Unauthorized',
          })
          .end();
      }
    } catch (error) {
      return next(error);
    }
  });
}
async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}
function hasRole(rolesRequired = []) {
  if (!rolesRequired.length) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const { role } = req.user;
      if (config.userRoles.includes(role)) {
        next();
      } else {
        res.status(403).send('forbidden');
      }
    });
}
module.exports = {
  signToken,
  isAuthenticated,
  hasRole,
};
