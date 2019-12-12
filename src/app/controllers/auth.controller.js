'use strict';
const AuthService = require('../services/auth.service');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var response;

function resolveSignIn(status) {
    let json;
    switch (status) {
        case 200:
            json = {
                code: status,
                status: 'Ok',
                message: 'Email or username already exists.'
            };
            break;
        case 201:
            json = {
                code: status,
                status: 'Created',
                message: 'The request has been fulfilled and has resulted in one new user created.'
            };
            break;
        case 403:
            json = {
                code: status,
                status: 'Source access denied',
                message: 'Username and password required'
            }
            break;
        case 422:
            json = {
                code: status,
                status: 'Unable to be Processed',
                message: 'Syntax error, email or username should not contain spaces or special characters.'
            }
            break;
        case 500:
            json = {
                code: status,
                status: 'Internal server error',
                message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
            }
            break;
    }
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(json));
}
function resolveLogIn(status, token) {
    let json;
    switch (status) {
        case 200:
            if (token) {
                json = {
                    code: status,
                    status: 'Ok',
                    message: 'The request has succeeded.',
                    token: token
                }
            } else {
                json = {
                    code: status,
                    status: 'Ok',
                    message: 'Wrong user or password.',
                    token: token
                }
            }
            break;
        case 403:
            json = {
                code: status,
                status: 'Source access denied',
                message: 'Username and password required'
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
function inputValidator(username, email) {
    const regExp = /^[0-9A-Za-z]+$/;
    return username.match(regExp) && emailValidator.validate(email) ? true : false;
}

function passwordCheck(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function decryptHeader(header) {
    const toDelete = 'Basic ';
    header = header.replace(toDelete, '');
    return atob(header).split(':');

}

function signin(req, res) {
    const auth = new AuthService();
    let username, email, password, salt, hash;
    response = res;
    if (req.headers.username) {
        username = req.headers.username,
            email = req.headers.email,
            password = req.headers.password;
        if (inputValidator(username, email)) {
            salt = bcrypt.genSaltSync(saltRounds);
            hash = bcrypt.hashSync(password, salt);
            auth.signin(username, email, hash, resolveSignIn);
        } else {
            resolveSignIn(422);
        }
    } else {
        resolveSignIn(403);
    }
}

function login(req, res) {
    const auth = new AuthService();
    let credentials;
    response = res;
    if (!req.headers.authorization) {
        resolveLogIn(403);
    } else {
        credentials = decryptHeader(req.headers.authorization);
        if (credentials[0].includes('@')) {
            auth.loginWithEmail(
                credentials[0],
                credentials[1],
                passwordCheck,
                resolveLogIn
            );
        } else {
            auth.loginWithUsername(
                credentials[0],
                credentials[1],
                passwordCheck,
                resolveLogIn
            );
        }
    }
}

module.exports = {
    signin,
    login
}