'use strict'

module.exports = (express) => {
    var router = express.Router()
    var passport = require('passport')
    router.use(express.static('public'))
    router.use(express.static('files'))
};