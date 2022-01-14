const { Router } = require('express');
const { MarketSchema } = require('./market.schema')
const { validate } = require('../../middleware/validateRequest')

const {
  createMarketHandler,
  deleteMarketHandler,
  getAllMarketsHandler,
  getMarketByIdHandler,
  updateMarketHandler,
} = require('./market.controller');

const router = Router();

router.get('/', getAllMarketsHandler);
router.post('/', validate(MarketSchema, 'body'), createMarketHandler);
router.get('/:id', validate(MarketSchema, 'params'), getMarketByIdHandler);
router.delete('/:id', deleteMarketHandler);
router.patch('/:id', updateMarketHandler);

module.exports = router;
