/* eslint no-underscore-dangle: "off" */

import Axios from 'axios';
import { Task } from '../../../shared/index';
import config from '../../../shared/config.json';
import TaskListRessource from './TaskListRessource';

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
        const taskList = store.state.taskListGroup.find(obj => obj.id === data.taskListId);
        TaskListRessource.updateTaskList(taskList);
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

const getTask = id => Axios({
  method: 'get',
  url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.task.endpoint}/${id}`,
}).then(res => new Task(
  res.data[0].id,
  res.data[0].title,
  res.data[0].description,
  new Date(res.data[0].creationDate),
  new Date(res.data[0].lastUpdate),
  res.data[0].commentList,
  res.data[0]._id,
));

export default {
  addTask,
  updateTask,
  retrieveTaskList,
  getTask,
};
