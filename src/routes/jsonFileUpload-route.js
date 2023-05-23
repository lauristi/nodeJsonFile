const express = require('express');
const controller = require('../controllers/jsonFileUpload-Controller')

const jsonFileUpload = express.Router();

jsonFileUpload.route('/api/jsonFileUpload')
         .post(controller.postFileJSON)

jsonFileUpload.route('/api/fileUploadPage')
         .get(controller.getPostFilePage)

module.exports = jsonFileUpload;
