'use strict';
const DatabaseConfigService = require('./database-config.service');
const TokenService = require('./token.service');
class AuthService extends DatabaseConfigService {
    constructor() {
        super();
    }
    signin(username, email, password, fx) {
        this.client.connect(err => {
            if (err) {
                fx(500);
                this.client.close();
            } else {
                this.client.db('news_db').collection('users').insertOne({
                    username: username,
                    email: email,
                    password: password
                }).then(res => {
                    if (res.insertedId) {
                        fx(201);
                    } else {
                        fx(500);
                    }
                    this.client.close();
                }).catch(err => {
                    fx(200);
                    this.client.close();
                });
            }
        });
    }
    loginWithUsername(username, password, passwordCheck, fx) {
        this.client.connect(err => {
            let token;
            if (err) {
                console.log(err);
                fx(500, err);
                this.client.close();
            } else {
                this.client.db('news_db').collection('users').find({ username: username }).toArray().then(res => {
                    const user = res[0];
                    if (res.length) {
                        console.log(password, res, username);
                        if (passwordCheck(password, user.password)) {
                            token = new TokenService().createToken(user._id, user.email);
                            fx(200, token);
                        } else {
                            fx(200);
                        }
                    } else {
                        fx(200);
                    }
                    this.client.close();
                }).catch(err => {
                    console.log(err);
                    fx(500, err);
                    this.client.close();
                });
            }
        });
    }
    loginWithEmail(email, password, passCheck, fx) {
        let token;
        this.client.connect(err => {
            if (err) {
                fx(500);
            } else {
                this.client.db('news_db').collection('users').find({ email: email }).toArray().then(res => {
                    const user = res[0];
                    if (res.length) {
                        if (passwordCheck(password, user.password)) {
                            token = new TokenService().createToken(user._id, user.email);
                            fx(200, token);
                        } else {
                            fx(200);
                        }
                    } else {
                        fx(200);
                    }
                    this.client.close();
                }).catch(err => {
                    fx(500);
                    this.client.close();
                });
            }
        });
    }
}
module.exports = AuthService;