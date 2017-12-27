import Axios from 'axios';
import { Message } from '../../../shared/index';
import config from '../../../shared/config.json';

const addMessage = (data) => {
  const message = new Message();
  Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.message.endpoint}`,
    data: message,
  });
};

export default {
  addMessage,
};
