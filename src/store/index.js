import Vue from 'vue';
import Vuex from 'vuex';

import User from './objects/User';
import TaskList from './objects/TaskList';
import Task from './objects/Task';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    taskCount: 0,
    taskListCount: 0,
    userCount: 0,
    taskListGroup: [],
    taskList: [],
    user: [],
  },
  mutations: {
    createTask(state, obj) {
      this.state.taskCount = state.taskCount + 1;
      const task = new Task(this.state.taskCount, obj.obj.title, obj.description, obj.taskListId);
      this.state.taskList.push(task);
    },
    createTaskList(state, obj) {
      this.state.taskListCount = state.taskListCount + 1;
      const taskList = new TaskList(this.state.taskListCount, obj.title);
      this.state.taskListGroup.push(taskList);
    },
    createUser(state, obj) {
      this.state.userCount = state.user + 1;
      const user = new User(this.userCount, obj.name);
      this.state.column.push(user);
    },
  },
});

export default store;
