const TokenService = require('../services/token.service');

function resolvePost(status, response) {
    let json = {};
    switch (status) {
        case 401:
            json = {
                code: status,
                status: 'Unauthorized error',
                message: 'Your session has expired'
            }
            break;
        case 403:
            json = {
                code: status,
                status: 'Source access denied',
                message: 'you must log before you can access data'
            }
            break;
    }
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(json));
}

function post(req, res) {
    let access;
    let ts;
    if (!req.header.authorization) {
        resolvePost(403, res);
    } else {
        ts = new TokenService();
        access = ts.validateToken(req.query.token);
        if (access) {
            
        } else {
            resolvePost(401, res);
        }
    }
}

module.exports = {
    post
}