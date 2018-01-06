/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'un message
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > message', req.body);
    database.insert(req.body, (err) => {
      if (err) res.sendStatus(400);
      else {
        res.sendStatus(200);
        winston.log('debug', 'message created');
        notify(config.endpoint, req.body.id);
      }
    });
  });

  // obtention des messages
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > message list');
    database.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });

  // suppresion d'ne message
  // /message/:id
  app.delete(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'DEL > message', req.params.id);
    database.remove({ id: parseInt(req.params.id, 10) }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) que l'objet a été supprimé */
        winston.log('debug', 'message removed');
      }
    });
  });

  // obtention d'un message
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > message ', req.params.id);
    database.find({ id: parseInt(req.params.id, 10) }, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });
};
