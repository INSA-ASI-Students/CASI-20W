/* eslint no-underscore-dangle: "off" */

import Axios from 'axios';
import { Message } from '../../../shared/index';
import config from '../../../shared/config.json';

const addMessage = (data) => {
  const message = new Message(data.user, data.content);
  Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.message.endpoint}`,
    data: message,
  });
};

const retrieveMessages = () => {
  const result = [];

  return Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.message.endpoint}`,
  })
    .then((res) => {
      res.data.forEach((obj) => {
        const message = new Message(obj.user, obj.content, obj._id);
        result.push(message);
      });
      return result;
    });
};

const getMessage = id => Axios({
  method: 'get',
  url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.message.endpoint}/${id}`,
}).then(res => new Message(res.data[0].user, res.data[0].content, res.data[0]._id));

export default {
  addMessage,
  retrieveMessages,
  getMessage,
};
