'use strict';
const jwt = require('jwt-simple');
const secret = require('../../config/config-file').SECRET_TOKEN;
class TokenService {
    expires() {
        exp = Date.now() + 60*60*1000 //Adds one hour to actual hour
        exp = new Date(exp); //Turns number into Date format
    }
    createToken(_id, email) {
        const payload = {
            id: _id,
            email: email,
            exp: Date.now() + 60*60*1000 //Adds one hour to actual hour
        }
        return jwt.encode(payload, secret, 'HS512');
    }
}

module.exports = TokenService;