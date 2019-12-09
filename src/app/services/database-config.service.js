'use strict';
class DatabaseConfigService {
    constructor() {
        const MongoClient = require('mongodb').MongoClient;
        const uri = require('../../config/config-file').URL;
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

module.exports = DatabaseConfigService;