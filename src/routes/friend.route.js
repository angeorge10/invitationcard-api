const express = require('express');
const friend = express.Router();
const friendController = require('../controllers/friend.controller');

friend.route('/friend').post(friendController.create);
friend.route('/friend').get(friendController.getAll);

module.exports = friend;