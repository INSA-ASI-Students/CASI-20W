/* eslint no-underscore-dangle:"off" */
const Datastore = require('nedb');

module.exports = (app, config, winston) => {
  const database = new Datastore(config.database);
  database.loadDatabase();

  // ajout d'un user
  app.put(config.endpoint, (req, res) => {
    winston.log('debug', 'PUT > user', req.body);
    database.insert(req.body, (err, newDoc) => { // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        winston.log('debug', 'user created');
      }
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
  app.delete(`${config.endpoint}:id`, (req, res) => {
    winston.log('debug', 'DEL > user', req.params.id);
    database.remove({ id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        winston.log('debug', 'user removed');
      }
    });
  });
};
