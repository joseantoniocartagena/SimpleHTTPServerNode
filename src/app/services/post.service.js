'use strict'
const DatabaseConfig = require('./database-config.service');
class PostService extends DatabaseConfig {
    constructor() {
        super();
    }
    newPost(title, body, image, userId, email, fx) {
        this.client.connect(err => {
            if (err) {
                fx(500);
                this.client.close();
            } else {
                this.client.db('news_db').collection('posts').insertOne({
                    userId: userId,
                    email: email,
                    title: title,
                    body: body,
                    image, image
                }).then(res => {
                    if (res.insertedId) {
                        fx(201);
                    } else {
                        fx(500);
                    }
                    this.client.close();
                }).catch(err => {
                    fx(500, err);
                    this.client.close();
                });
            }
        });
    }
}

module.exports = PostService;