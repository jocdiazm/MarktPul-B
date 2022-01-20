const { Router } = require('express');
const { ProductSchema } = require('./product.schema');
const { validate } = require('../../middleware/validateRequest');

const {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} = require('./product.controller');
const { isAuthenticated } = require('../auth/auth.services');
const router = Router();

router.get('/', isAuthenticated, getAllProductsHandler);
router.post(
  '/',
  isAuthenticated,
  validate(ProductSchema, 'body'),
  createProductHandler,
);
router.get(
  '/:id',
  isAuthenticated,
  validate(ProductSchema, 'params'),
  getProductByIdHandler,
);
router.delete('/:id', isAuthenticated, deleteProductHandler);
router.patch('/:id', isAuthenticated, updateProductHandler);

module.exports = router;
