/* eslint no-underscore-dangle:"off" */
/* eslint no-param-reassign:"off" */
const Datastore = require('nedb');

module.exports = (app, config, notify, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'un user
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'PUT > user', req.body);
    // get max id
    database.findOne({}).sort({ id: -1 }).exec((err, userMaxId) => {
      if (userMaxId) req.body.id = userMaxId.id + 1;
      else req.body.id = 1;

      database.findOne({ name: req.body.name }, (errFindUser, user) => {
        if (user) {
          res.sendStatus(400);
        } else {
          database.insert(req.body, () => {
            res.setHeader('Content-Type', 'text/json');
            res.status(200).send(req.body);
            winston.log('debug', 'user created');
            notify(config.endpoint, req.body.id);
          });
        }
      });
    });
  });

  // obtention des users
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > user list');
    database.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });

  // suppresion d'un user
  // /user/:id
  app.delete(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'DEL > user', req.params.id);
    database.remove({ id: parseInt(req.params.id, 10) }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        /* TODO: notifier tous les utilisateurs (en ajax reverse) que l'objet a été supprimé */
        winston.log('debug', 'user removed');
      }
    });
  });

  // obtention d'un user
  app.get(`${config.endpoint}/:id`, (req, res) => {
    winston.log('debug', 'GET > user ', req.params.id);
    database.findOne({ id: parseInt(req.params.id, 10) }, (err, doc) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(doc);
      }
    });
  });

  // connection d'un user
  app.get(`${config.endpoint}/:name/:password`, (req, res) => {
    winston.log('debug', 'GET > user name password ', req.params.id);
    database.findOne({ name: req.params.name, password: req.params.password }, (err, doc) => {
      if (!doc) res.sendStatus(400);
      else {
        doc.password = undefined;
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(doc);
      }
    });
  });
};
