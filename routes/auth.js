const express = require('express');
const config = require('./config.json');
const router = express.Router();

const githubOAuth = require('github-oauth')({
    githubClient: config.githubClient,
    githubSecret: config.githubSecret,
    baseURL: config.baseURL,
    loginURI: '/api/auth/login',
    callbackURI: '/api/auth/callback',
    scope: 'user' // optional, default scope is set to user
});

router.get('/', async (req, res) => {
    res.send('Hello, world!');
});