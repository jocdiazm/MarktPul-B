const Joi = require('joi');
const joiObjectId = require('joi-objectid');
Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50),
  location: Joi.string(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'es', 'co'] },
    }),
  username: Joi.string().min(3).max(30),
  password: Joi.string().required().min(8),
  salt: Joi.string(),
  md5: Joi.string(),
  sha1: Joi.string(),
  sha256: Joi.string(),
  dob: Joi.string(),
  registered: Joi.string(),
  phone: Joi.string(),
  cell: Joi.string(),
  picture: Joi.string(),
  nat: Joi.string(),
  role: Joi.string().default('user'),
  marketId: Joi.objectId().required(),
});

const UserSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = {
  UserSchema,
};
