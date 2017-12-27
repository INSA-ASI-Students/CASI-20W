import Axios from 'axios';
import { User } from '../../../shared/index';
import config from '../../../shared/config.json';

const addUser = (data) => {
  const user = new User();
  Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.user.endpoint}`,
    data: user,
  });
};

export default {
  addUser,
};
