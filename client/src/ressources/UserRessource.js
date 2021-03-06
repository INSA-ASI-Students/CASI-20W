/* eslint no-underscore-dangle: "off" */
import Axios from 'axios';
import { User } from '../../../shared/index';
import config from '../../../shared/config.json';

const addUser = (store, data) => {
  const user = new User(0, data.name, data.password);

  return Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
    data: user,
  })
    .then((res) => {
      if (res.status === 200) {
        store.commit('setCurrentUserId', res.data.id);
        store.commit('addUser', res.data);
        return true;
      }
      return false;
    });
};

const connectUser = (store, data) => Axios({
  method: 'get',
  url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}/${data.name}/${data.password}`,
})
  .then((res) => {
    if (res.status === 200) {
      store.commit('setCurrentUserId', res.data.id);
      return true;
    }
    return false;
  });

const updateUser = (data) => {
  const user = new User(data.id, data.name, undefined, data.document);
  user.selectedTask = data.selectedTask;

  Axios({
    method: 'post',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
    data: user,
  });
};

const retrieveUsers = () => {
  const result = [];
  return Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
  })
    .then((res) => {
      res.data.forEach((obj) => {
        const user = new User(obj.id, obj.name, undefined, obj._id);
        result.push(user);
      });
      return result;
    });
};

const getUser = id => Axios({
  method: 'get',
  url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}/${id}`,
}).then(res => new User(
  res.data.id,
  res.data.name,
  undefined,
  res.data._id,
  res.data.selectedTask,
));

export default {
  addUser,
  connectUser,
  retrieveUsers,
  updateUser,
  getUser,
};
