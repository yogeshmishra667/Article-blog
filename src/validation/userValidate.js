const Joi = require('@hapi/joi');

const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(6).max(30).required(),
  username: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
  password2: Joi.any().valid(Joi.ref('password')).required(),
});

module.exports = validateUserSchema;
