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

<<<<<<< HEAD
router.get('/', getAllMarketsHandler);
router.post('/', createMarketHandler);
// router.post('/', validate(MarketSchema, 'body'), createMarketHandler);
router.get('/:id', validate(MarketSchema, 'params'), getMarketByIdHandler);
router.delete('/:id', deleteMarketHandler);
router.patch('/:id', updateMarketHandler);
=======
router.get('/', isAuthenticated(), getAllMarketsHandler);
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
>>>>>>> feature/login

module.exports = router;
