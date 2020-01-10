'use strict'

const logger = require('morgan')
const cors = require('cors')
var express = require("express");
var app = express();
var http = require("http").createServer(app);
const CONFIG = require("./config/config");
var io = require('socket.io')(http);
const pe = require('parse-error');
var bodyParser = require('body-parser');
var boolParser = require('express-query-boolean');
var methodOverride = require('method-override')
const fileUpload = require('express-fileupload');

//setup middleware
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(boolParser());
app.use(bodyParser.json())
app.use(methodOverride())

// init passport
const passport = require('passport');
require('./middleware/jwtStrategy')(passport);
app.use(passport.initialize())

const routerV1 = require('./router/routerV1')(express, passport)

//DATABASE
const db = require('./db/sequelize');

db.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database');
    db.sequelize.sync({ force: false });
}).catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err)
});
app.get('/', (req, res) => {
    res.json("hello world");
});

app.use('/v1', routerV1);

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

app.listen(CONFIG.port, () => {
    console.log("server listening on port 3000")
});