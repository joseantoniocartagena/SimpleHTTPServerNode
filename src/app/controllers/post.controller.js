const TokenService = require('../services/token.service');
const PostService = require('../services/post.service');
var response;
function resolveNewPost(status) {
    let json = {};
    switch (status) {
        case 200:
            json = {
                code: status,
                status: 'Ok',
                message: 'Title and body required'
            }
        case 201:
            json = {
                code: status,
                status: 'Created',
                message: 'The request has been fulfilled and has resulted in one new post created.'
            };
            break;
        case 403:
            json = {
                code: status,
                status: 'Source access denied',
                message: 'you must log before you can access data'
            }
            break;
        case 500:
            json = {
                code: status,
                status: 'Internal server error',
                message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.',
                token: token
            }
            break;
    }
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(json));
}

function decryptHeader(header) {
    const toDelete = 'Bearer ';
    return header.replace(toDelete, '');
}

function newPost(req, res) {
    let token;
    let ps;
    let access;
    let data = req.query
    response = res;
    if (!req.headers.authorization) {
        resolveNewPost(403, res);
    } else {
        token = decryptHeader(req.headers.authorization);
        access = new TokenService().validateToken(token);
        if (access) {
            if (!data.title || !data.body) {
                resolveNewPost(200);
            } else {
                ps = new PostService();
                ps.newPost(data.title, data.body, data.image, access.id, access.email, resolveNewPost);
            }
        } else {
            resolveNewPost(403, res);
        }
    }
}

module.exports = {
    newPost
}