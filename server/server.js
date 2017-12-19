/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');

const app = express();
//  , db = new Datastore();
const db = {};
db.tasks = new Datastore('./database/tasks.db');
db.tasks.loadDatabase();

db.taskLists = new Datastore('./database/taskLists.db');
db.taskLists.loadDatabase();

db.users = new Datastore('./database/users.db');
db.users.loadDatabase();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

// var Task = require('./objects/Task.js');
// compte le nombre de de taches
// db.tasks.count({}, function (err, count) {
//   console.log(count);
// });


// ajout d'une tache
app.put('/task', (req, res) => {
  console.log(req.body);
  db.tasks.insert(req.body, (err, newDoc) => {
    // Callback is optional
    if (err) res.sendStatus(400);
    else {
      res.status(200).send({ _id: newDoc._id });
      console.log('Inserted');
    }

    db.tasks.count({}, (errCount, count) => {
      console.log(count);
    });
  });
});

// obtention des taches
app.get('/task', (req, res) => {
  db.tasks.find({}, (err, docs) => {
    if (err) res.sendStatus(400);
    else {
      res.setHeader('Content-Type', 'text/json');
      res.status(200).send(docs);
    }
  });
});

// suppresion d'une tache
// /task/:id
app.delete('/task/:id', (req, res) => {
  db.tasks.remove({ _id: req.params.id }, (err) => {
    if (err) res.sendStatus(404);
    else {
      res.sendStatus(204);
      console.log('Removed');
    }
  });
});

// Modification d'un tache
app.post('/task', (req, res) => {
  db.tasks.update(
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
    }
  );
});

// ajout d'une liste de taches
app.put('/taskList', (req, res) => {
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
app.get('/taskList', (req, res) => {
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
app.delete('/taskList/:id', (req, res) => {
  db.taskLists.remove({ _id: req.params.id }, (err) => {
    if (err) res.sendStatus(404);
    else {
      res.sendStatus(204);
      console.log('Removed');
    }
  });
});


// ajout d'un user
app.put('/user', (req, res) => {
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
app.get('/user', (req, res) => {
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
app.delete('/user/:id', (req, res) => {
  db.users.remove({ _id: req.params.id }, (err) => {
    if (err) res.sendStatus(404);
    else {
      res.sendStatus(204);
      console.log('Removed');
    }
  });
});

app.listen(8080);
