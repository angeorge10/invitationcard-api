const express = require('express');
const authentication = express.Router();

const authenticationController = require('../controllers/authentication.controller');

// Routes for Authentication
authentication.route('/login').post(authenticationController.login);
authentication.route('/logout').get(authenticationController.logout);

module.exports = authentication;