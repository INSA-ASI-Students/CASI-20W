/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');

const taskListRessource = require('./ressources/TaskListRessource');
const taskRessource = require('./ressources/TaskRessource');
const userRessource = require('./ressources/UserRessource');

const app = express();
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

taskListRessource(app, db);
taskRessource(app, db);
userRessource(app, db);

app.listen(8080);
