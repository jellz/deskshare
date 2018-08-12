const Joi = require('joi');
const RateLimit = require('express-rate-limit');

exports.handleJoi = (schema, req, res) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        if (!result.error.isJoi) {
            console.error(`Error while running Joi at ${Date.now()}: ${result.error}`);
            res.sendStatus(500);
            return false;
        }
        res.status(400).json({ error: result.error.name, details: result.error.details.map(item => item.message) });
        return false;
    } else return true;
}

exports.rateLimiter = new RateLimit({
    windowMs: 2000,
    max: 5,
    delayMs: 0
});