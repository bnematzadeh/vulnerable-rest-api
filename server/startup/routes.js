const express = require('express');
const cors = require('cors');
const vhost = require('vhost');
const me = require('../routes/me');
const authors = require('../routes/authors');
const books = require('../routes/books');
const categories = require('../routes/categories');
const users = require('../routes/users');
const usersDev = require('../routes/usersDev');
const auth = require('../routes/auth');
const adminAuth = require('../routes/adminAuth');
const system = require('../routes/system');
const log = require('../routes/log');
const error = require('../middleware/error');

const corsOptions = {
    exposedHeaders: 'X-Auth-Token',
};

module.exports = function(app, appDev){
    app.use(vhost('dev.localhost', appDev));
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/api/authors', authors);
    app.use('/api/books', books);
    app.use('/api/categories', categories);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/adminAuth', adminAuth);
    app.use('/api/system', system);
    app.use('/api/logs', log);
    app.use('/api/me', me);
    appDev.use('/api/users', usersDev);
    app.use(error);
}