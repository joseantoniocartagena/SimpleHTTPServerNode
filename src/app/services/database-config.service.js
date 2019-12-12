'use strict';
class DatabaseConfigService {
    constructor() {
        const MongoClient = require('mongodb').MongoClient;
        var FirebaseClient = require('firebase-admin');
        const constants = require('../../config/config-file');
        const uri = constants.URL;
        const firebaseConfig = constants.FIREBASE_CONFIG;
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //this.images = FirebaseClient.initializeApp(firebaseConfig);
    }
}

module.exports = DatabaseConfigService;