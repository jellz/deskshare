const express = require('express');
const ejwt = require('express-jwt');
const fs = require('fs');
const cors = require('cors');
// const config = require('./config.json');
const app = express();

const port = process.env.PORT || 3000;

const r = module.exports.r = require('rethinkdbdash')({ db: 'deskshare' });
const jwtKey = module.exports.jwtKey = require('fs').readFileSync('jwt.key').toString();

app.enable('trust proxy');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:1373' }));
app.use(require('morgan')('dev'));

app.use(ejwt({ secret: jwtKey, credentialsRequired: false }), async (req, res, next) => {
    const id = parseInt(req.user, 10);
    if (!id) return next();
    const user = await r.table('users').get(id).run();
    next();
});

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/posts', require('./routes/posts.js'));
app.use('/api/users', require('./routes/users.js'));

app.listen(port, () => console.log('deskshare-api listening on port ' + port));
