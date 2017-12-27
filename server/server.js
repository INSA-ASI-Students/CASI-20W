/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const taskListRessource = require('./ressources/TaskListRessource');
const taskRessource = require('./ressources/TaskRessource');
const userRessource = require('./ressources/UserRessource');

const config = require('../shared/config.json');

if (process.env.LOG_LEVEL) winston.level = process.env.LOG_LEVEL;
else winston.level = 'debug';

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

app.use('/', express.static(`${process.cwd()}/../client`));

// Allow cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

taskRessource(app, config.server.ressources.task, winston);
taskListRessource(app, config.server.ressources.taskList, winston);
userRessource(app, config.server.ressources.user, winston);

const server = app.listen(
  config.server.port,
  config.server.hostname,
  () => {
    winston.log('info', 'Server listening', {
      date: new Date(),
      address: server.address().address,
      port: server.address().port,
    });
  },
);
