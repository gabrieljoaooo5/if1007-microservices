const express = require('express');
const UserController = require('./controllers/UserController');
const TrelloController = require('./controllers/ImportToTrello');
const StrateegiaController = require('./controllers/ExportFromStrateegia');
const KitController = require('./controllers/KitController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.post('/importTrello', TrelloController.import);

routes.get('/exportSrateegia', StrateegiaController.export);

routes.post('/kits', KitController.store);
routes.get('/kits', KitController.index);
routes.delete('/kits', KitController.delete);

module.exports = routes;