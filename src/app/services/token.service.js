'use strict';
const jwt = require('jwt-simple');
const secret = require('../../config/config-file').SECRET_TOKEN;
class TokenService {
    createToken(_id, email) {
        const payload = {
            id: _id,
            email: email,
            exp: Date.now() + 60 * 60 * 1000 //Adds one hour to actual hour
        }
        return jwt.encode(payload, secret, 'HS512');
    }
    validateToken(token) {
        let payload = jwt.decode(token, secret, 'HS512');
        return Date.now() >= payload.exp ? false : payload;
    }
}

module.exports = TokenService;