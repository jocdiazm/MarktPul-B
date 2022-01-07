const Joi = require('Joi');
const joiObjectId = require('joi-objectid')
Joi.objectId = joiObjectId(Joi)

const ParamsSchema = Joi.object({
  id: Joi.objectId().required()
})

const PayloadSchema = Joi.object().keys({
  title: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(10).max(250),
  organizer: Joi.string().required(),
  address: Joi.string(),
  virtual: Joi.boolean(),
  thumbnail: Joi.string(),
  category: Joi.string(),
  images: Joi.array()
})

const MarketSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
})

module.exports = {
  MarketSchema
}
