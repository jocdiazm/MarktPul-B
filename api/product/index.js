const { Router } = require('express');

const {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} = require('./product.controller');

const router = Router();

router.get('/', getAllProductsHandler);
router.post('/', createProductHandler);
router.get('/:id', getProductByIdHandler);
router.delete('/:id', deleteProductHandler);
router.patch('/:id', updateProductHandler);

module.exports = router;
