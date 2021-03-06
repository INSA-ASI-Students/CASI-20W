/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const boardRessource = require('./ressources/BoardRessource');
const taskListRessource = require('./ressources/TaskListRessource');
const taskRessource = require('./ressources/TaskRessource');
const userRessource = require('./ressources/UserRessource');
const messageRessource = require('./ressources/MessageRessource');
const notifyRessource = require('./ressources/NotifyRessource');


const config = require('../shared/config.json');

if (process.env.LOG_LEVEL) winston.level = process.env.LOG_LEVEL;
else winston.level = 'debug';

const app = express();

// tableau qui stocke les reponses, pour les envoyer plus tard
const responses = [];

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

app.use('/', express.static(`${process.cwd()}/../client`));

// Allow cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const notify = (endpoint, id) => {
  const data = [{ method: 'GET', endpoint, id }];

  while (responses.length > 0) {
    if (endpoint === config.server.ressources.task.endpoint) {
      data.push({
        method: 'GET',
        endpoint: config.server.ressources.taskList.endpoint,
        id: undefined,
      });
    }
    responses.pop().status(200).send(data);
  }
  winston.log('debug', 'Notified');
};

boardRessource(app, config.server.ressources.board, notify, winston);
taskRessource(app, config.server.ressources.task, notify, winston);
taskListRessource(app, config.server.ressources.taskList, notify, winston);
userRessource(app, config.server.ressources.user, notify, winston);
messageRessource(app, config.server.ressources.message, notify, winston);
notifyRessource(app, config.server.ressources.notify, notify, responses, winston);

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
