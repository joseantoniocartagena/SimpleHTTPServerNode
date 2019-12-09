'use strict';
const DatabaseConfigService = require('../services/database-config.service');
class AuthService extends DatabaseConfigService {
    constructor() {
        super();
    }
    signin(username, email, password, fx) {
        this.client.connect(err => {
            if (err) {
                fx(500);
            } else {
                this.client.db("news_db").collection("users").insertOne({
                    username: username,
                    email: email,
                    password: password
                }).then(res => {
                    if (res.insertedId) {
                        fx(201);
                    } else {
                        fx(500);
                    }
                }).catch(err => {
                    fx(200);
                });
            }
            this.client.close();
        });
    }
    login(email, password) {

    }
    logout() {

    }
}
module.exports = AuthService;