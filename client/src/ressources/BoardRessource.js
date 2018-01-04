/* eslint no-underscore-dangle: "off" */
import Axios from 'axios';
import { Board } from '../../../shared/index';
import config from '../../../shared/config.json';

const addBoard = (data) => {
  const board = new Board();
  Axios({
    method: 'put',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.board.endpoint}`,
    data: board,
  });
};

const updateBoard = (data) => {
  const board = new Board();
  Axios({
    method: 'post',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.board.endpoint}`,
    data: board,
  });
};

const retrieveBoardGroup = () => new Promise((resolve, reject) => {
  const result = [];
  Axios({
    method: 'get',
    url: `http://${config.server.hostname}:${config.server.port}${config.server.ressources.board.endpoint}`,
  })
    .then((res) => {
      res.data.forEach((obj) => {
        const board = new Board(
          obj.id,
          obj.title,
          obj.taskList,
          obj._id,
        );
        result.push(board);
      });
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  addBoard,
  updateBoard,
  retrieveBoardGroup,
};
