/* eslint no-underscore-dangle: "off" */

import Axios from 'axios';
import { Task } from '../../../shared/index';
import config from '../../../shared/config.json';

const addTask = (data) => {
  const task = new Task();
  Axios.put(config.server.ressources.task.endpoint, task);
};

const updateTask = (data) => {
  const task = new Task();
  Axios.post(config.server.ressources.task.endpoint, task);
};

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

export default {
  addTask,
  updateTask,
  retrieveTaskList,
};
