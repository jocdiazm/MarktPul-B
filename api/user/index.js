const { Router } = require('express');
const { UserSchema } = require('./user.schema');
const { validate } = require('../../middleware/validateRequest');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
<<<<<<< HEAD
  getUserMeHandler
=======
  getUserMeHandler,
>>>>>>> 4a9e07ce2f40defe4d1e1793c3df0e711382bae3
} = require('./user.controller');

const { isAuthenticated } = require('../../auth/auth.services');

const router = Router();

router.get('/', isAuthenticated(), getAllUsersHandler);
router.get('/me', isAuthenticated(), getUserMeHandler);
<<<<<<< HEAD
router.post('/', createUserHandler);
=======
>>>>>>> 4a9e07ce2f40defe4d1e1793c3df0e711382bae3
router.post('/', validate(UserSchema, 'body'), createUserHandler);
router.get(
  '/:id',
  isAuthenticated(),
  validate(UserSchema, 'params'),
  getUserByIdHandler,
);
router.delete('/:id', isAuthenticated(), deleteUserHandler);
router.patch('/:id', isAuthenticated(), updateUserHandler);

module.exports = router;
