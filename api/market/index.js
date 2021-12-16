const { Router } = require('express');

const {
  createMarketHandler,
  deleteMarketHandler,
  getAllMarketsHandler,
  getMarketByIdHandler,
  updateMarketHandler,
} = require('./market.controller');

const router = Router();

router.get('/', getAllMarketsHandler);
router.post('/', createMarketHandler);
router.get('/:id', getMarketByIdHandler);
router.delete('/:id', deleteMarketHandler);
router.patch('/:id', updateMarketHandler);

module.exports = router;
