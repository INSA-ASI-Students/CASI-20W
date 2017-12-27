/* eslint no-underscore-dangle: "off" */
import Axios from 'axios';
import { TaskList } from '../../../shared/index';
import config from '../../../shared/config.json';

const addTaskList = (data) => {
  const taskList = new TaskList();
  Axios.put(config.server.ressources.taskList.endpoint, taskList);
};

const updateTaskList = (data) => {
  const taskList = new TaskList();
  Axios.post(config.server.ressources.taskList.endpoint, taskList);
};

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
  addTaskList,
  updateTaskList,
  retrieveTaskListGroup,
};
