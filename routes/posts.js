const express = require('express');
const router = module.exports = express.Router();
const r = require('../index.js').r;
const { handleJoi } = require('../util.js');

router.post('/', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!await handleJoi(require('../schemas/NewPost.js'), req, res)) return;
    await r.table('posts').insert({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        authorId: req.user.id,
        upvotes: 0,
        hidden: false
    });
});