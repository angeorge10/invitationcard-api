const express = require('express');
const account = express.Router();

const accountController = require('../controllers/account.controller');

// Routes for Authentication
account.route('/signup').post(accountController.signup);

module.exports = account;
