const Joi = require('joi');

module.exports = Joi.object().required().keys({
    title: Joi.string().max(35).min(2).required(),
    description: Joi.string().max(280).required(),
    images: Joi.array().min(1).max(15).items(Joi.string().uri().required()).required(),
});