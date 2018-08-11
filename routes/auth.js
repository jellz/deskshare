const express = require('express');
const config = require('../config.json');
const router = module.exports = express.Router();
const octokit = require('@octokit/rest')()

const githubOAuth = require('github-oauth')({
    githubClient: config.githubClient,
    githubSecret: config.githubSecret,
    baseURL: config.baseURL,
    loginURI: '/api/auth/login',
    callbackURI: '/api/auth/callback',
    scope: '' // optional, default scope is set to user
});

router.get('/', async (req, res) => {
    res.send('Hello, world!');
});

githubOAuth.addRoutes(router, async (err, token) => {
    if (err) return console.error(err);
    // this is a tale of a github token
    // it comes from a machine that runs the github api software
    // its probably a random string from the entropy the server somehow got
    // now its here and its gonna do some magic
    octokit.authenticate({
        type: "oauth",
        token
    });
    const user = await octokit.users.get({});
    console.log(user);
});