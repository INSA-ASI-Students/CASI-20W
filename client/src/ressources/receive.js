import Axios from 'axios';
import config from '../../../shared/config.json';

const updateRessource = (store, method, endpoint, id = undefined) => {
  switch (endpoint) {
    case config.server.ressources.messages:
      if (method.toLowerCase() === 'get' && id) {
        store.commit('retrieveMessages');
      }
      break;
    case config.server.ressources.boards:
      break;
    case config.server.ressources.tasks:
      if (method.toLowerCase() === 'get' && id) {
        store.commit('retrieveTaskList');
      }
      break;
    case config.server.ressources.taskLists:
      if (method.toLowerCase() === 'get' && id) {
        store.commit('retrieveTaskListGroup');
      }
      break;
    case config.server.ressources.users:
      if (method.toLowerCase() === 'get' && id) {
        store.commit('retrieveUsers');
      }
      break;
    default:
  }
};

const getNotified = (store) => {
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.notify.endpoint}`,
  })
    .then((res) => {
      updateRessource(store, res.data.method, res.data.endpoint, res.data.id);
      getNotified(store);
    })
    .catch(() => getNotified(store));
};

export default store => getNotified(store);
