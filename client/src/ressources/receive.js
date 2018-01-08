import Axios from 'axios';
import config from '../../../shared/config.json';

const updateRessource = (endpoint, id) => {
  switch (endpoint) {
    case config.server.ressources.messages:
      break;
    case config.server.ressources.boards:
      break;
    case config.server.ressources.tasks:
      break;
    case config.server.ressources.taskLists:
      break;
    case config.server.ressources.users:
      break;
    default:
  }
};

const getNotified = (notifyAgain, store) => {
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.notify.endpoint}`,
  })
    .then((res) => {
      updateRessource(res.data.endpoint, res.data.id);
    })
    .catch(() => notifyAgain(store));
};

const notifyAgain = (store) => {
  getNotified(store);
};

export default () => getNotified.bind(notifyAgain);
