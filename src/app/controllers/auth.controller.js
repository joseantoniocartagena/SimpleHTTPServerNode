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
                status: 'OK',
                message: 'Email or username already exists.'
            };
            break;
        case 201:
            json = {
                code: status,
                status: 'CREATED',
                message: 'The request has been fulfilled and has resulted in one new user being created.'
            };
            break;
        case 422:
            json = {
                code: status,
                status: 'UNABLE TO BE PROCESSED',
                message: 'Syntax error, email or username should not contain spaces or special characters.'
            }
            break;
        case 500:
            json = {
                code: status,
                status: 'INTERNAL SERVER ERROR',
                message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
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
function signin(req, res) {
    let auth = new AuthService();
    let data = req.query;
    response = res;
    console.log(data.username, data.email);
    if (inputValidator(data.username, data.email)) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(data.password, salt);
        auth.signin(data.username, data.email, hash, resolveSignIn);
    } else {
        resolveSignIn(422);
    }
}

module.exports = {
    signin
}