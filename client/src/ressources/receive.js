/* global XMLHttpRequest */
/* eslint brace-style:"off", curly:"off" */

import config from '../../../shared/config.json';
import MessageRessource from './MessageRessource';
// import TaskRessource from './TaskRessource';
// import TaskListRessource from './TaskListRessource';
import UserRessource from './UserRessource';

const updateRessource = (store, method, endpoint, id = undefined) => {
  switch (endpoint) {
    case config.server.ressources.message.endpoint:
      if (id) store.commit('addMessage', MessageRessource.getMessage(id));
      else store.commit('retrieveMessages');
      break;
    case config.server.ressources.board.endpoint:
      break;
    case config.server.ressources.task.endpoint:
      // if (id) TaskRessource.getTask(id).then((task) => {
      //   if (store.state.taskList.find(obj => obj.id === id)) store.commit('updateTask', task);
      //   else store.commit('addTask', task);
      // });
      // else store.commit('retrieveTaskList');
      store.commit('retrieveTaskList');
      break;
    case config.server.ressources.taskList.endpoint:
      // if (id) TaskListRessource.getTaskList(id).then((taskList) => {
      //   if (store.state.taskListGroup.find(obj => obj.id === id)) store.commit('updateTaskList', taskList);
      //   else store.commit('addTaskList', taskList);
      // });
      // else store.commit('retrieveTaskListGroup');
      store.commit('retrieveTaskListGroup');
      break;
    case config.server.ressources.user.endpoint:
      if (id) UserRessource.getUser(id).then((user) => {
        if (store.state.userList.find(obj => obj.id === id)) store.commit('updateUser', user);
        else store.commit('addUser', user);
      });
      else store.commit('retrieveUsers');
      break;
    default:
  }
};

const getNotified = (store) => {
  const xdr = new XMLHttpRequest();
  xdr.onload = () => {
    const res = JSON.parse(xdr.responseText);
    for (let i = 0; i < res.length; i++) {
      const obj = res[i];
      updateRessource(store, obj.method, obj.endpoint, obj.id);
    }
    getNotified(store);
  };

  xdr.onerror = () => getNotified(store);
  xdr.open('GET', `http://${config.server.hostname}:${config.server.port}${config.server.ressources.notify.endpoint}`);
  xdr.send();
};

export default store => getNotified(store);
