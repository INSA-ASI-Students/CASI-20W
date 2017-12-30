/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'une tache
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > task', req.body);
    database.insert(req.body, (err) => {
      if (err) res.sendStatus(400);
      else {
        res.sendStatus(200);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) de faire un
           GET sur l'endpoint courant afin de récupérer l'objet créé */
        winston.log('debug', 'task created');
      }
    });
  });

  // obtention des taches
  app.get(config.endpoint, (req, res) => {
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
  app.delete(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'DEL > task', req.params.id);
    database.remove({ "id": parseInt(req.params.id) }, {}, (err, num) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) que l'objet a été supprimé */
        winston.log('debug', 'task removed');
      }
    });
  });

  // Modification d'un tache
  app.post(config.endpoint, (req, res) => {
    winston.log('debug', 'POST > task', req.body);
    database.update(
      { id: req.body.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          lastUpdate: req.body.lastUpdate,
        },
      },
      {},
      (err) => {
        if (err) res.sendStatus(400);
        else {
          res.sendStatus(200);
          /* TODO: notifier tous les utilisateurs (en ajax reverse) de faire un
          GET sur l'endpoint courant afin de récupérer l'objet modifié */
          winston.log('debug', 'task updated');
        }
      },
    );
  });

  // obtention d'une task
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > task ', req.params.id);
    database.find({id: parseInt(req.params.id)}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });

};
