const express = require('express');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const { r, jwtKey } = require('../');
const snek = require('snekfetch');
const router = module.exports = express.Router();
const octokit = require('@octokit/rest')()

router.get('/login', (req, res) => res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubClient}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback`))

router.get('/callback', async (req, res) => {
    const ares = await snek.get(`https://github.com/login/oauth/access_token?client_id=${config.githubClient}&client_secret=${config.githubSecret}&code=${encodeURIComponent(req.query.code)}`);
    const token = ares.body.access_token;
    // this is a tale of a github token
    // it comes from a machine that runs the github api software
    // its probably a random string from the entropy the server somehow got
    // now its here and its gonna do some magic
    octokit.authenticate({
        type: 'oauth',
        token: token
    });
    const { data } = await octokit.users.get({});
    let user = await r.table('users').get(data.id).run();
    if (!!user) {
        // user already exists, we do nothing ig uess 
        // idk maybe daniel will get crazy and make it update stuff
        // UPDATE from daniel: no, i dont have anything to do here
    } else {
        // new user
        await r.table('users').insert({
            id: data.id,
            username: data.login,
            avatar: data.avatar_url,
            createdAt: Date.now()
        }).run();
        user = r.table('users').get(data.id).run();
    }
    const jwtToken = await jwt.sign(user.id, jwtKey);
    res.send(`
        <script>opener.postMessage('${jwtToken}', 'http://localhost:1373'); close();</script>
    `);
});
