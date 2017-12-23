/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

const endpoint = '/taskLists';

module.exports = (app, dbPath, winston) => {
  const database = new Datastore(dbPath);
  database.loadDatabase();

  // ajout d'une liste de taches
  app.put(endpoint, (req, res) => {
    winston.log('debug', 'ADD > taskList', req.body);
    database.insert(req.body, (err, newDoc) => { // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        winston.log('debug', 'taskList created');
      }
    });
  });

  // obtention des listes de taches
  app.get(endpoint, (req, res) => {
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
  app.delete(`${endpoint}:id`, (req, res) => {
    winston.log('debug', 'DEL > taskList', req.params.id);
    database.remove({ _id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        winston.log('debug', 'taskList removed');
      }
    });
  });
};
