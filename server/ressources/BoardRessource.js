/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // creation d'un tableau
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > board', req.body);
    database.insert(req.body, (err) => {
      if (err) res.sendStatus(400);
      else {
        res.sendStatus(200);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) de faire un
           GET sur l'endpoint courant afin de récupérer l'objet créé */
        winston.log('debug', 'board created');
      }
    });
  });

  // obtention des tableaux
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > board list');
    database.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });


  // suppresion d'un tableau
  // /boards/:id
  app.delete(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'DEL > board', req.params.id);
    database.remove({ id: parseInt(req.params.id, 10) }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) que l'objet a été supprimé */
        winston.log('debug', 'board removed');
      }
    });
  });

  // obtention d'un tableau
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > board ', req.params.id);
    database.find({ id: parseInt(req.params.id, 10) }, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });
};
