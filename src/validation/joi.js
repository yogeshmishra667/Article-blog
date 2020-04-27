const Joi = require('@hapi/joi');

const validateSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  author: Joi.string().min(6).max(30).required(),
  body: Joi.string().min(10).required(),
});

module.exports = validateSchema;
