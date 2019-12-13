'use strict'
const DatabaseConfigService = require('./database-config.service');

class ImageService extends DatabaseConfigService {
    uploadImage(image, type) {
        const storage = require('@google-cloud/storage');
        const constants = require('../../config/config-file');
        const imageName = Math.floor(Math.random() * Date.now());
        const fileName = imageName + '.' + type;
    }
}

module.exports = ImageService;