'use strict'
const { to } = require('await-to-js');
const pe = require('parse-error');
const ErrorCodeMessage = require('../models/error')

module.exports.to = async(promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) {
        return [pe(err)];
    }
}

module.exports.ReS = (res, data, code, message = 'success', isLastPage = true) => {
    let responseObject = {};
    if (typeof code !== 'undefined') res.statusCode = code;
    responseObject.data = data;
    responseObject.message = message;
    responseObject.isLastPage = isLastPage;
    return res.json(responseObject);
}

module.exports.ReE = (res, error, code) => {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message
    }
    if (typeof code !== 'undefined') {
        res.statusCode = code
    }
    return res.json({ success: false, message: err })
}

module.exports.TE = (err_message, log) => {
    if (log === true) {
        console.error(err_message)
    }
    throw new Error(err_message)
};

module.exports.TeWithCode = (err_message, code, log = true) => {
    if (log === true) {
        console.error(err_message)
    }
    throw new ErrorCodeMessage(code, err_message)
};