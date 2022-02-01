const Joi = require('joi');
const joiObjectId = require('joi-objectid');
Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  title: Joi.string().required().min(3).max(50),
  description: Joi.string().optional().allow("").min(10).max(250),
  country: Joi.string().optional().allow(""),
  city: Joi.string().optional().allow(""),
  moreDetails: Joi.string().optional().allow(""),
  organizer: Joi.string().optional().allow(""),
  address: Joi.string().optional().allow(""),
  virtual: Joi.string().optional().allow(""),
  thumbnail: Joi.string().optional().allow(""),
  category: Joi.string().optional().allow(""),
  image: Joi.string().optional().allow(""),
});

const MarketSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = {
  MarketSchema,
};
