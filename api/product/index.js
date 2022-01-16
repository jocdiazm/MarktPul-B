const { Router } = require('express');
const { ProductSchema } = require('./product.schema')
const { validate } = require('../../middleware/validateRequest')
const multer = require('multer')
const upload = multer({ dest:'./temp'})

const {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} = require('./product.controller');

const router = Router();

router.get('/', getAllProductsHandler);
router.post('/', upload.single('imageMain'), createProductHandler);
// router.post('/', validate(ProductSchema, 'body'), upload.single('imageMain'),
// createProductHandler);
router.get('/:id', validate(ProductSchema, 'params'), getProductByIdHandler);
router.delete('/:id', deleteProductHandler);
router.patch('/:id', updateProductHandler);

module.exports = router;
