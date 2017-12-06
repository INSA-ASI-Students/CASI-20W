import Vue from 'vue';
import Vuex from 'vuex';

import User from './objects/User';
import TaskList from './objects/TaskList';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    taskListGroup: [],
    user: [],
  },
  mutations: {
    createTaskList(state, obj) {
      const taskList = new TaskList(obj.title);
      state.taskListGroup.push(taskList);
    },
    createUser(state, obj) {
      const user = new User(obj.name);
      state.column.push(user);
    },
  },
});

export default store;
