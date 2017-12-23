/* eslint no-console:"off", no-underscore-dangle:"off" */
const endpoint = '/taskList';

module.exports = (app, db) => {
  // ajout d'une liste de taches
  app.put(endpoint, (req, res) => {
    console.log(req.body);
    db.taskLists.insert(req.body, (err, newDoc) => { // Callback is optional
      if (err) res.sendStatus(400);
      else {
        res.status(200).send({ _id: newDoc._id });
        console.log('Inserted');
      }
      db.taskLists.count({}, (errCount, count) => {
        console.log(count);
      });
    });
  });

  // obtention des listes de taches
  app.get(endpoint, (req, res) => {
    db.taskLists.find({}, (err, docs) => {
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
    db.taskLists.remove({ _id: req.params.id }, (err) => {
      if (err) res.sendStatus(404);
      else {
        res.sendStatus(204);
        console.log('Removed');
      }
    });
  });
};
