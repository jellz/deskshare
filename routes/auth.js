const express = require('express');
const router = module.exports = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello, world!');
});