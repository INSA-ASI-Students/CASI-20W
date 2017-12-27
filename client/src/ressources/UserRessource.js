import Axios from 'axios';
import { User } from '../../../shared/index';
import config from '../../../shared/config.json';

const addUser = (data) => {
  const user = new User();
  Axios.put(config.server.ressources.user.endpoint, user);
};

export default {
  addUser,
};
