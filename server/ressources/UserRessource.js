/* eslint no-console:"off", no-underscore-dangle:"off" */
const endpoint = '/user';

module.exports = (app, db) => {
  // ajout d'un user
  app.put(endpoint, (req, res) => {
    console.log(req.body);
    db.users.insert(req.body, (err, newDoc) => { // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        console.log('Inserted');
      }
      db.users.count({}, (errCount, count) => {
        console.log(count);
      });
    });
  });

  // obtention des users
  app.get(endpoint, (req, res) => {
    db.users.find({}, (err, docs) => {
      if (err) res.sendStatus(400);
      else {
        res.setHeader('Content-Type', 'text/json');
        res.status(200).send(docs);
      }
    });
  });

  // suppresion d'un user
  // /user/:id
  app.delete(`${endpoint}:id`, (req, res) => {
    db.users.remove({ _id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        console.log('Removed');
      }
    });
  });
};
