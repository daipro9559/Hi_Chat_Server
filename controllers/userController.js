'use strict'
const { User } = require('../db/user');
const { to, ReS, ReE } = require('../util/util');
const status = require('http-status');

module.exports.register = (req, res) => {
    return ReS(res, "register here", status.OK)
}