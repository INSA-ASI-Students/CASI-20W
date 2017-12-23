/* eslint no-console:"off", no-underscore-dangle:"off" */
const Datastore = require('nedb');

const endpoint = '/tasks';

module.exports = (app, dbPath) => {
  const database = new Datastore(dbPath);
  database.loadDatabase();

  // ajout d'une tache
  app.put(endpoint, (req, res) => {
    console.log(req.body);
    database.insert(req.body, (err, newDoc) => {
      // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        console.log('Inserted');
      }

      database.count({}, (errCount, count) => {
        console.log(count);
      });
    });
  });

  // obtention des taches
  app.get(endpoint, (req, res) => {
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
    database.remove({ _id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        console.log('Removed');
      }
    });
  });

  // Modification d'un tache
  app.post(endpoint, (req, res) => {
    database.update(
      { _id: req.body._id },
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
          console.log('Updated');
        }
      },
    );
  });
};
