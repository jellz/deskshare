const express = require('express');
const ejwt = require("express-jwt");
const fs = require('fs');
// const config = require('./config.json');
const app = express();

const port = process.env.PORT || 3000;

const r = module.exports.r = require('rethinkdbdash')({ db: 'deskshare' });
const jwtKey = module.exports.jwtKey = require('fs').readFileSync('jwt.key').toString();

app.use(express.json());
app.use(require('morgan')('dev'));

app.use(ejwt({secret: jwtKey}), async (req, res, next) => {
    const id = parseInt(req.user, 10);
    const user = await r.table('users').get(id).run();
    next();
});

app.use('/api/auth', require('./routes/auth.js'));

app.listen(port, () => console.log('deskshare-api listening on port ' + port));
