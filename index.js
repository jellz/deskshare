const express = require('express');
const fs = require('fs');
// const config = require('./config.json');
const app = express();

const port = process.env.PORT || 3000;

const r = module.exports.r = require('rethinkdbdash')({ db: 'deskshare' });
const jwtKey = module.exports.jwtKey = require('fs').readFileSync('jwt.key').toString();

app.use(express.json());
app.use(require('morgan')('dev'));

app.use('/api/auth', require('./routes/auth.js'));

app.listen(port, () => console.log('deskshare-api listening on port ' + port));
