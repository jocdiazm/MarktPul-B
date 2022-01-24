const { Router } = require('express');
const { MarketSchema } = require('./market.schema');
const { validate } = require('../../middleware/validateRequest');

const {
  createMarketHandler,
  deleteMarketHandler,
  getAllMarketsHandler,
  getMarketByIdHandler,
  updateMarketHandler,
} = require('./market.controller');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const router = Router();

router.get('/', getAllMarketsHandler);
router.post(
  '/',
  isAuthenticated(),
  validate(MarketSchema, 'body'),
  createMarketHandler,
);
router.get(
  '/:id',
  isAuthenticated(),
  validate(MarketSchema, 'params'),
  getMarketByIdHandler,
);
router.delete('/:id', hasRole(['admin']), deleteMarketHandler);
router.patch('/:id', isAuthenticated(), updateMarketHandler);

module.exports = router;
