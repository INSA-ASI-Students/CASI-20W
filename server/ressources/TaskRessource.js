/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, notify, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'une tache
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'ADD > task', req.body);

    // get max id
    database.findOne({}).sort({ id: -1 }).exec((err, taskMaxId) => {
      if (taskMaxId) req.body.id = taskMaxId.id + 1;
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
    database.remove({ id: parseInt(req.params.id, 10) }, {}, (err) => {
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
          creationDate: req.body.creationDate,
          lastUpdate: req.body.lastUpdate,
          commentList: req.body.commentList,
          document: req.body.document,
        },
      },
      {},
      (err) => {
        if (err) res.sendStatus(400);
        else {
          res.sendStatus(200);
          winston.log('debug', 'task updated');
          notify(config.endpoint, req.body.id);
        }
      },
    );
  });

  // obtention d'une task
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > task ', req.params.id);
    database.findOne({ id: parseInt(req.params.id, 10) }, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });
};
