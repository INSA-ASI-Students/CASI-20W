/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, notify, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // creation d'un tableau
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > board', req.body);

    // get max id
    database.findOne({}).sort({ id: -1 }).exec((err, boardMaxId) => {
      if (boardMaxId) req.body.id = boardMaxId.id + 1;
      else req.body.id = 1;
      database.insert(req.body, (errInsert) => {
        if (errInsert) {
          res.sendStatus(400);
        } else {
          res.setHeader('Content-Type', 'text/json');
          res.status(200).send(req.body);
          winston.log('debug', 'task created');
          notify(config.endpoint, req.body.id);
        }
      });
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

  // Modification d'un tableau
  app.post(config.endpoint, (req, res) => {
    winston.log('debug', 'POST > board list', req.body);
    database.update(
      { id: req.body.id },
      {
        $set: {
          title: req.body.title,
          taskList: req.body.taskLists,
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
          winston.log('debug', 'board updated');
        }
      },
    );
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
    database.findOne({ id: parseInt(req.params.id, 10) }, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });
};
