/* eslint no-underscore-dangle: "off" */
import Axios from 'axios';
import { TaskList } from '../../../shared/index';
import config from '../../../shared/config.json';

const addTaskList = (store, data) => {
  const taskList = new TaskList(
    0,
    data.title,
  );
  return Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.taskList.endpoint}`,
    data: taskList,
  })
    .then((res) => {
      if (res.status === 200) {
        store.commit('addTaskList', res.data);
        return true;
      }
      return false;
    });
};

const updateTaskList = (data) => {
  const taskList = new TaskList(
    data.id,
    data.title,
    data.taskList,
    data.document,
  );
  Axios({
    method: 'post',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.taskList.endpoint}`,
    data: taskList,
  });
};

const retrieveTaskListGroup = () => new Promise((resolve, reject) => {
  const result = [];
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.taskList.endpoint}`,
  })
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

const getTaskList = id => Axios({
  method: 'get',
  url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.taskList.endpoint}/${id}`,
}).then(res => new TaskList(
  res.data.id,
  res.data.title,
  res.data.taskList,
  res.data._id,
));

export default {
  addTaskList,
  updateTaskList,
  retrieveTaskListGroup,
  getTaskList,
};
