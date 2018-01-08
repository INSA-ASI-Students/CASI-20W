/* eslint no-underscore-dangle: "off" */

import Axios from 'axios';
import { Task } from '../../../shared/index';
import config from '../../../shared/config.json';

const addTask = (store, data) => {
  const task = new Task(
    0,
    data.title,
    data.description,
  );
  return Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.task.endpoint}`,
    data: task,
  })
    .then((res) => {
      if (res.status === 200) {
        res.data.taskListId = data.taskListId;
        store.commit('addTask', res.data);
        return true;
      }
      return false;
    });
};

const updateTask = (data) => {
  const task = new Task(
    data.id,
    data.title,
    data.description,
    data.creationDate,
    data.lastUpdate,
    data.commentList,
    data.document,
  );
  Axios({
    method: 'post',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.task.endpoint}`,
    data: task,
  });
};

const retrieveTaskList = () => new Promise((resolve, reject) => {
  const result = [];
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.task.endpoint}`,
  })
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
