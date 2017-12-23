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

taskListRessource(app);
taskRessource(app);
userRessource(app);

app.listen(8080);
