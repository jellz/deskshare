const express = require('express');
const fs = require('fs');
// const config = require('./config.json');
const app = express();

const port = process.env.PORT || 3000;

<<<<<<< HEAD
const r = (module.exports.r = require('rethinkdbdash')({ db: 'deskshare' }));
const jwtKey = (module.exports.jwtKey = require('fs')
  .readFileSync('jwtRS256.key')
  .toString());
=======
const r = module.exports.r = require('rethinkdbdash')({ db: 'deskshare' });
const jwtKey = module.exports.jwtKey = require('fs').readFileSync('jwt.key').toString();
>>>>>>> 94fb0b5889da856af85b0ea8a7938de474d318fb

app.use(express.json());
app.use(require('morgan')('dev'));

app.use('/api/auth', require('./routes/auth.js'));

app.listen(port, () => console.log('deskshare-api listening on port ' + port));
