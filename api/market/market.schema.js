const Joi = require('joi');
const joiObjectId = require('joi-objectid')
Joi.objectId = joiObjectId(Joi)

const ParamsSchema = Joi.object({
  id: Joi.objectId().required()
})

const PayloadSchema = Joi.object().keys({
  title: Joi.string().required().min(3).max(50),
  description: Joi.string().required().min(10).max(250),
  organizer: Joi.string().required(),
  address: Joi.string(),
  virtual: Joi.boolean(),
  thumbnail: Joi.string(),
  category: Joi.string(),
  image: Joi.string().required(),
  place: Joi.string().required()
})

const MarketSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
})

module.exports = {
  MarketSchema
}
