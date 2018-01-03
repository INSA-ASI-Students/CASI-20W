/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'une liste de taches
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > taskList', req.body);
    database.insert(req.body, (err) => {
      if (err) res.sendStatus(400);
      else {
        res.sendStatus(200);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) de faire un
           GET sur l'endpoint courant afin de récupérer l'objet créé */
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

  // Modification d'une liste de taches
  app.post(config.endpoint, (req, res) => {
    winston.log('debug', 'POST > task list', req.body);
    database.update(
      { id: req.body.id },
      {
        $set: {
          title: req.body.title,
          taskList: req.body.taskList,
          document: req.body.document,
        },
      },
      {},
      (err) => {
        if (err) res.sendStatus(400);
        else {
          res.sendStatus(200);
          /* TODO: notifier tous les utilisateurs (en ajax reverse) de faire un
          GET sur l'endpoint courant afin de récupérer l'objet modifié */
          winston.log('debug', 'taskList updated');
        }
      },
    );
  });


  // suppresion d'une liste de taches
  // /taskList/:id
  app.delete(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'DEL > taskList', req.params.id);
    database.remove({ id: parseInt(req.params.id, 10) }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) que l'objet a été supprimé */
        winston.log('debug', 'taskList removed');
      }
    });
  });

  // obtention d'une tasklist
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > tasklist ', req.params.id);
    database.find({ id: parseInt(req.params.id, 10) }, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });
};
