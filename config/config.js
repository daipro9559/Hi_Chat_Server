require('dotenv').config()
let CONFIG = {};
CONFIG.ENV = process.env.ENV;
CONFIG.db_host = "127.0.0.1";
CONFIG.db_name = "mini_social";
CONFIG.db_user = "root";
CONFIG.db_password = "daipro1995";
CONFIG.port = process.env.PORT;
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION;
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION;
module.exports = CONFIG