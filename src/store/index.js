import Vue from 'vue';
import Vuex from 'vuex';

import User from './objects/User';
import TaskList from './objects/TaskList';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    column: [],
    user: [],
  },
  mutations: {
    createTaskList(state) {
      const taskList = new TaskList(state.title);
      state.column.push(taskList);
    },
    createUser(state) {
      const user = new User(state.name);
      state.column.push(user);
    },
  },
});

export default store;
