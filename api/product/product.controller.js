// const fs = require('fs')
// const cloudinary = require('cloudinary').v2

// const { uploadArrayHandler } = require('../upload/upload')

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getProductsByMarketId,
} = require('./product.service');

async function getAllProductsHandler(req, res) {
  try {
    const products = await getAllProducts();

    if (products.length == 0) {
      return res.status(404).json({ message: `no products found` });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createProductHandler(req, res) {
  const { price, description, title, marketId } = req.body;
  const { user } = req;
  try {
    if (!price || !description || !title) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }
    const newProduct = {
      ...req.body,
      marketId: marketId,
    };
    const responseCreateProduct = await createProduct(newProduct);
    return res.status(201).json(responseCreateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
  res.send(req.file);
}

async function getProductByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateProductHandler(req, res) {
  const { id } = req.params;
  const { price, description, title } = req.body;
  try {
    if (!price && !description && !title) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const product = await updateProduct(id, req.body, {
      new: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteProductHandler(req, res) {
  const { id } = req.params;
  try {
    const product = await deleteProduct(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `product not found with id: ${id}` });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function getProductsByMarketIdHandler(req, res) {
  const { id } = req.params;
  try {
    const products = await getProductsByMarketId(id);
    if (!products) {
      return res
        .status(404)
        .json({ message: `MarketId not found with id: ${id}` });
    }
    return res.status(200).json(products);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProductsHandler,
  createProductHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsByMarketIdHandler,
};
