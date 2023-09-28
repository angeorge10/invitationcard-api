const express = require('express');
const card = express.Router();
const cardController = require('../controllers/card.controller');

card.route('/card').post(cardController.create);
card.route('/card').get(cardController.getAll);
card.route('/card/:id').get(cardController.getById);

module.exports = card;