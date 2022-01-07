const Joi = require('Joi');
const joiObjectId = require('joi-objectid')
Joi.objectId = joiObjectId(Joi)

const ParamsSchema = Joi.object({
  id: Joi.objectId().required()
})

const PayloadSchema = Joi.object().keys({
  price: Joi.number().required(),
  images: Joi.array(),
  title: Joi.string().required().min(5).max(30),
  description: Joi.string().required().min(10).max(250),
  stock: Joi.number(),
  thumbnail: Joi.string(),
  category: Joi.string(),
})

const ProductSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
})

module.exports = {
  ProductSchema
}
