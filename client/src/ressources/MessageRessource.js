import Axios from 'axios';
import { Message } from '../../../shared/index';
import config from '../../../shared/config.json';

const addMessage = (data) => {
  const message = new Message();
  Axios.put(config.server.ressources.message.endpoint, message);
};

export default {
  addMessage,
};
