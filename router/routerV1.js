'use strict'

var { getAuthPath } = require('./apiPath');
var userController = require('../controllers/userController');


module.exports = (express, passport) => {
    var router = express.Router();
    router.use(express.static('public'))
        // authentication
    router.post(getAuthPath('register'), userController.register);

    return router;
};