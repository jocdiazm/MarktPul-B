const Product = require('./product.model');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * Get all products
 * @returns all products
 */

async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}
/**
 * Get Product by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns Product
 */
async function getProductById(id) {
  try {
    const product = await Product.findById(id).populate('marketId');
    return product;
  } catch (error) {
    throw error;
  }
}
/**
 * Create a new Product
 * @param {Object} product Product to create
 * @returns Product created
 */
async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    throw error;
  }
}
/**
 * Update a Product
 * @param {string} id  Indentifier of the note to be updated
 * @returns Product updated
 */
async function updateProduct(id, product) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
/**
 * Delete a Product
 * @param {string} id  Indentifier of the note to be updated
 * @returns Product deleted
 */
async function deleteProduct(id) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
}
async function getProductsByMarketId(id) {
  try {
    const products = await Product.find({ marketId: Array(id) });
    return products;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByMarketId,
};
