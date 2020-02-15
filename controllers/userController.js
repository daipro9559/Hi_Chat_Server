'use strict'
const { User } = require('../db/user');
const { to, ReS, ReE } = require('../util/util');
const status = require('http-status');

import UserService from '../services/userService';

var userService = new UserService(User);


class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async register(req, res) {
        [err, data] = await to(this.userService.register(req.body))
        return ReS(res, "dataResponse", 200, "Create user successfully!")
    }
}

export default new UserController(userService);