/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'une liste de taches
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > taskList', req.body);
    database.insert(req.body, (err, newDoc) => { // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send(newDoc);
        winston.log('debug', 'taskList created');
      }
    });
  });

  // obtention des listes de taches
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > taskList list');
    database.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });


  // suppresion d'une liste de taches
  // /taskList/:id
  app.delete(`${config.endpoint}:id`, (req, res) => {
    winston.log('debug', 'DEL > taskList', req.params.id);
    database.remove({ id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        winston.log('debug', 'taskList removed');
      }
    });
  });
};
