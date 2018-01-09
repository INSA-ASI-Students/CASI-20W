/* global XMLHttpRequest */
import Axios from 'axios';
import config from '../../../shared/config.json';

const updateRessource = (store, method, endpoint, id = undefined) => {
  switch (endpoint) {
    case config.server.ressources.message.endpoint:
      store.commit('retrieveMessages');
      break;
    case config.server.ressources.board.endpoint:
      break;
    case config.server.ressources.task.endpoint:
      store.commit('retrieveTaskList');
      break;
    case config.server.ressources.taskList.endpoint:
      store.commit('retrieveTaskListGroup');
      break;
    case config.server.ressources.user.endpoint:
      store.commit('retrieveUsers');
      break;
    default:
  }
};

const getNotified = (store) => {
  const xdr = new XMLHttpRequest();
  xdr.onload = () => {
    const res = JSON.parse(xdr.responseText);
    updateRessource(store, res.method, res.endpoint, res.id);
    getNotified(store);
  };
  xdr.open('GET', `http://${config.server.hostname}:${config.server.port}${config.server.ressources.notify.endpoint}`);
  xdr.send();
};

export default store => getNotified(store);
