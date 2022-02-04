const {
  getAllMarkets,
  createMarket,
  deleteMarket,
  getMarketById,
  updateMarket,
} = require('./market.service');

async function getAllMarketsHandler(req, res) {
  try {
    const markets = await getAllMarkets();

    if (markets.length == 0) {
      return res.status(404).json({ message: `no markets found` });
    }

    return res.status(200).json(markets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createMarketHandler(req, res) {
  const { title } = req.body;
  console.log('entra en createHandler');
  try {
    if (!title) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const market = await createMarket(req.body);
    return res.status(201).json(market);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getMarketByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const market = await getMarketById(id);
    if (!market) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(market);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateMarketHandler(req, res) {
  const { id } = req.params;
  try {
    const { title, description, organizer, place } = req.body;

    if (!title && !description && !organizer && !place) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const market = await updateMarket(id, req.body, {
      new: true,
    });

    if (!market) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(204).json(market);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteMarketHandler(req, res) {
  const { id } = req.params;
  try {
    const market = await deleteMarket(id);

    if (!market) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(market);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMarketsHandler,
  createMarketHandler,
  getMarketByIdHandler,
  updateMarketHandler,
  deleteMarketHandler,
};
