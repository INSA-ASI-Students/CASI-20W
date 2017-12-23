/* eslint no-console:"off", no-underscore-dangle:"off" */
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const taskListRessource = require('./ressources/TaskListRessource');
const taskRessource = require('./ressources/TaskRessource');
const userRessource = require('./ressources/UserRessource');

if (process.env.LOG_LEVEL) winston.level = process.env.LOG_LEVEL;
else winston.level = 'debug';

const app = express();
const host = 'localhost';
const port = 8080;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

taskListRessource(app, './database/taskLists.db', winston);
taskRessource(app, './database/tasks.db', winston);
userRessource(app, './database/users.db', winston);

const server = app.listen(port, host, () => {
  winston.log('info', 'Server listening', {
    date: new Date(),
    address: server.address().address,
    port: server.address().port,
  });
});
