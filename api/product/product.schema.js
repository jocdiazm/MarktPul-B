const Joi = require('joi');
const joiObjectId = require('joi-objectid');
Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  price: Joi.number().required(),
  // imageMain: Joi.string().required(),
  imageMain: Joi.string(),
  images: Joi.array(),
  title: Joi.string().required().min(3).max(40),
  description: Joi.string().required().min(10).max(400),
  stock: Joi.number(),
  thumbnail: Joi.string(),
  category: Joi.string(),
  marketId: Joi.array(),
});

const ProductSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = {
  ProductSchema,
};
