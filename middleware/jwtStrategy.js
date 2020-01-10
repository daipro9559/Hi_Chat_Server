'use strict'
const jwtPassport = require('passport-jwt');
const CONFIG = require('../config/config');
const { to } = require('../util/util');
const { User } = require('../db/user');
const JWTStrategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;
    passport.use(new JWTStrategy(opts, async(payload, done) => {
        let err, user;
        [err, user] = await to(User.findById(payload.userId));
        if (err) {
            return done(err, false);
        }
        if (user) return done(null, user);
        else return done(null, false);
    }));
}