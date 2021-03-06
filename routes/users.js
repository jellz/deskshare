const express = require('express');
const router = module.exports = express.Router();
const r = require('../index.js').r;
const { rateLimiter } = require('../util.js');

router.use(rateLimiter);

router.get('/@me', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    res.json({ me: await r.table('users').get(parseInt(req.user)).run() });
});

router.get('/:id', async (req, res) => {
    const user = await r.table('users').get(parseInt(req.params.id)).run();
    if (!user) return res.status(404).json({ error: 'Invalid user' });
    res.json({ user });
});

router.get('/:id/posts', async (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    const user = await r.table('users').get(parseInt(req.params.id)).run();
    if (!user) return res.status(404).json({ error: 'Invalid user' });
    res.json({ posts: await r.table('posts').filter({ authorId: user.id }).run() });
});