'use strict'

var { getAuthPath } = require('./apiPath');
import userController from '../controllers/userController';


module.exports = (express, passport) => {
    var router = express.Router();
    router.use(express.static('public'))
        // authentication
    router.post(getAuthPath('register'), userController.register);

    return router;
};