'use strict'
const { to, TE } = require('../util/util');
const CONFIG = require('../config/config')
const bcrypt_promise = require('bcrypt-promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {

    class User extends Sequelize.Model {

        async comparePassword(pw) {
            let err, pass;
            if (!this.password) {
                TE('password not set');
            }
            [err, pass] = await to(bcrypt_promise.compare(pw, this.password));
            if (err) { TE(err); }
            if (!pass) {
                TE("password");
            }
            return this;
        }

        getJWT() {
            let exp_time = parseInt(CONFIG.jwt_expiration);
            return "Bearer " + jwt.sign({ userId: this.userId }, CONFIG.jwt_encryption, { expiresIn: exp_time });
        }
    }

    User.init({
        id: {
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        tokenFirebase: {
            type: DataTypes.STRING,
            allowNull: true, // null when user logout
            unique: true,
        },
        phone: {
            type: DataType.STRING,
            allowNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: { msg: "Email invalid." }
            }
        },
        password: {
            type: DataTypes.STRING,
        },
    }, { sequelize });

    User.beforeSave(async(user, options) => {
        if (user.changed('password')) {
            let err, salt, hash;
            [err, salt] = await to(bcrypt.genSalt(15));
            if (err) { TE(err, true) }
            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) { TE(err, true) };
            user.password = hash;
        }
    });
    return User;
}