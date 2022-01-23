const { Router } = require('express');
const { UserSchema } = require('./user.schema');
const { validate } = require('../../middleware/validateRequest');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  loginUSerHandler,
} = require('./user.controller');

const { isAuthenticated } = require('../auth/auth.services');

const router = Router();

router.get('/', isAuthenticated, getAllUsersHandler);
router.post('/', createUserHandler);
// router.post('/', validate(UserSchema, 'body'), createUserHandler);
router.post('/login', loginUSerHandler);
router.get(
  '/:id',
  isAuthenticated,
  validate(UserSchema, 'params'),
  getUserByIdHandler,
);
router.delete('/:id', isAuthenticated, deleteUserHandler);
router.patch('/:id', isAuthenticated, updateUserHandler);

module.exports = router;
