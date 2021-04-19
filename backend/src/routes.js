const express = require('express');
const UserController = require('./controllers/UserController');
const TrelloController = require('./controllers/ImportToTrello');
const StrateegiaController = require('./controllers/ExportFromStrateegia');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.show);
routes.put('/users', UserController.update);

routes.post('/importTrello', TrelloController.import);
routes.get('/exportSrateegia', StrateegiaController.export);
module.exports = routes;