const Market = require('./market.model');
/**
 * Get all markets
 * @returns all markets
 */

async function getAllMarkets (){
    try{
        const markets = await Market.find();
        return markets;
    } catch(error){
      console.log('error', error)
        throw error;
    }
}
/**
 * Create a new Market
 * @param {Object} market Market to create
 * @returns Market created
 */
 async function createMarket(market){
  try {
    const newMarket = new Market(market);
    const savedMarket = await newMarket.save();
    return savedMarket;
  } catch (error) {
    throw error;
  }
}
/**
 * Get Market by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns Market
 */
async function getMarketById(id){
  try {
    const market = await Market.findById(id);
    return market;
  } catch (error) {
    throw error;
  }
}
/**
 * Update a Market
 * @param {string} id  Indentifier of the note to be updated
 * @returns Market updated
 */
async function updateMarket(id, market){
    try {
        const updatedMarket = await Market.findByIdAndUpdate(id, market);
        return updatedMarket;
    } catch (error) {
        throw error;
    }
}
/**
 * Delete a Market
 * @param {string} id  Indentifier of the note to be updated
 * @returns Market deleted
 */
async function deleteMarket(id){
    try {
        const deletedMarket= await Market.findByIdAndDelete(id);
        return deletedMarket;
    } catch (error) {
        throw error;
    }
}
module.exports = {
  getAllMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  deleteMarket,
}
