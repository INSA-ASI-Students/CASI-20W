/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const bodyParser = require('body-parser');

const taskListRessource = require('./ressources/TaskListRessource');
const taskRessource = require('./ressources/TaskRessource');
const userRessource = require('./ressources/UserRessource');

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

taskListRessource(app, './database/taskLists.db');
taskRessource(app, './database/tasks.db');
userRessource(app, './database/users.db');

app.listen(8080);
