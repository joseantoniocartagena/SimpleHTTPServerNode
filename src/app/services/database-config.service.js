'use strict';
class DatabaseConfigService {
    constructor() {
        const MongoClient = require('mongodb').MongoClient;
        const constants = require('../../config/config-file');
        const uri = constants.URL;
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    initializeApp() {
        return;
    }
}

module.exports = DatabaseConfigService;