const express = require('express');
const UserController = require('./controllers/UserController');
const TrelloController = require('./controllers/ImportToTrello');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.show);
routes.put('/users', UserController.update);

routes.put('/importTrello', TrelloController.import);

module.exports = routes;