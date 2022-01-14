const { Router } = require('express');
const { UserSchema } = require('./user.schema')
const { validate } = require('../../middleware/validateRequest')

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} = require('./user.controller');

const router = Router();

router.get('/', getAllUsersHandler);
router.post('/', validate(UserSchema, 'body'), createUserHandler);
router.get('/:id', validate(UserSchema, 'params'), getUserByIdHandler);
router.delete('/:id', deleteUserHandler);
router.patch('/:id', updateUserHandler);

module.exports = router;
