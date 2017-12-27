/* eslint no-underscore-dangle: "off" */

import Axios from 'axios';

import {
  TaskList,
  Task,
} from '../../../shared/index';

const config = require('../../../shared/config.json');

const retrieveTaskList = () => new Promise((resolve, reject) => {
  const result = [];
  Axios.get(config.server.ressources.task.endpoint)
    .then((res) => {
      res.data.forEach((obj) => {
        const task = new Task(
          obj.id,
          obj.title,
          obj.description,
          new Date(obj.creationDate),
          new Date(obj.lastUpdate),
          obj.commentList,
          obj._id,
        );
        result.push(task);
      });
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const retrieveTaskListGroup = () => new Promise((resolve, reject) => {
  const result = [];
  Axios.get(config.server.ressources.taskList.endpoint)
    .then((res) => {
      res.data.forEach((obj) => {
        const taskList = new TaskList(
          obj.id,
          obj.title,
          obj.taskList,
          obj._id,
        );
        result.push(taskList);
      });
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  retrieveTaskList,
  retrieveTaskListGroup,
};
