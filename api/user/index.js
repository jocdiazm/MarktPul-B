const { Router } = require('express');
const { UserSchema } = require('./user.schema');
const { validate } = require('../../middleware/validateRequest');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  getUserMeHandler,
} = require('./user.controller');

const { isAuthenticated } = require('../../auth/auth.services');

const router = Router();

router.get('/', isAuthenticated(), getAllUsersHandler);
router.get('/me', isAuthenticated(), getUserMeHandler);
router.post('/', createUserHandler);
router.get(
  '/:id',
  isAuthenticated(),
  validate(UserSchema, 'params'),
  getUserByIdHandler,
);
router.delete('/:id', isAuthenticated(), deleteUserHandler);
router.patch('/:id', isAuthenticated(), updateUserHandler);

module.exports = router;
