import Axios from 'axios';
import { User } from '../../../shared/index';
import config from '../../../shared/config.json';

const addUser = (store, data) => {
  const user = new User(0, data.name, data.password);
  console.log(`ADDING ${user}`);
  return Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
    data: user,
  })
    .then((res) => {
      if (res.status === 200) {
        store.commit('setCurrentUserId', res.data.id);
      }

      // TODO : Do something if there is an error
    });
};

const retrieveUsers = store =>
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
  })
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        store.commit('addUser', res.data[i]);
      }
    });

export default {
  addUser,
  retrieveUsers,
};
