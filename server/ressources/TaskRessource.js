/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

const endpoint = '/api/tasks';

module.exports = (app, dbPath, winston) => {
  const database = new Datastore(dbPath);
  database.loadDatabase();

  // ajout d'une tache
  app.put(endpoint, (req, res) => {
    winston.log('debug', 'ADD > task', req.body);
    database.insert(req.body, (err, newDoc) => {
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        winston.log('debug', 'task created');
      }
    });
  });

  // obtention des taches
  app.get(endpoint, (req, res) => {
    winston.log('debug', 'GET > task list');
    database.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });

  // suppresion d'une tache
  // /task/:id
  app.delete(`${endpoint}:id`, (req, res) => {
    winston.log('debug', 'DEL > task', req.params.id);
    database.remove({ id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        winston.log('debug', 'task removed');
      }
    });
  });

  // Modification d'un tache
  app.post(endpoint, (req, res) => {
    winston.log('debug', 'POST > task', req.body);
    database.update(
      { id: req.body.id },
      {
        $set: {
          titre: req.body.titre,
          description: req.body.description,
          taskListId: req.body.taskListId,
        },
      },
      {},
      (err) => {
        if (err) res.sendStatus(400);
        else {
          res.sendStatus(200);
          winston.log('debug', 'task updated');
        }
      },
    );
  });
};
