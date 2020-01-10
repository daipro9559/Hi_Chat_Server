'use strict'

const AUTH_PREFIX = '/auth/';

module.exports.getAuthPath = (path) => {
    return AUTH_PREFIX + path;
}