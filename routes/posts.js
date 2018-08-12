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
        authorId: parseInt(req.user),
        upvotes: [],
        hidden: false
    });
    res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(400);
    const post = await r.table('posts').get(req.params.id).run();
    if (!post) return res.sendStatus(404);
    if (req.user.id !== post.authorId) return res.sendStatus(403);
    await r.table('posts').get(req.params.id).delete().run();
    res.sendStatus(200);
});

router.post('/:id/upvotes', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(400);
    const post = await r.table('posts').get(req.params.id).run();
    if (!post) return res.sendStatus(404);
    console.log(post.upvotes);
    if (post.upvotes.includes(parseInt(req.user))) {
        console.log('removed upvote');
        post.upvotes.splice(post.upvotes.indexOf(parseInt(req.user)), 1);
    } else {
        console.log('added upvote');
        post.upvotes.push(parseInt(req.user));
    }
    await r.table('posts').update(post).run();
    res.json({ upvotes: post.upvotes });
});

router.get('/', async (req, res) => {
    res.json({ posts: await r.table('posts').run() });
});