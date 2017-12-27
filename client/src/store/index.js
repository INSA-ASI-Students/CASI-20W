/* eslint no-unused-vars: "off" */

import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

import {
  User,
  TaskList,
  Task,
  Message,
} from '../../../shared/index';


import DataController from './DataController';

Vue.use(Vuex);

const defaultUser = new User(1, 'anonymous');
const taskEndpoint = '/api/tasks';
const taskListEndpoint = '/api/taskLists';
const userEndpoint = '/api/users';

const store = new Vuex.Store({
  state: {
    currentUserId: defaultUser.id,
    taskList: [],
    taskListGroup: [],
    userList: [
      defaultUser,
    ],
    commentList: [],
  },
  getters: {
    currentUser(state) {
      return state.userList.find(user => user.id === state.currentUserId);
    },
  },
  actions: {
    retrieveData(context) {
      context.commit('retrieveTaskList');
      context.commit('retrieveTaskListGroup');
    },
  },
  mutations: {
    retrieveTaskList(state) {
      DataController.retrieveTaskList().then((res) => {
        this.state.taskList = res;
      });
    },
    retrieveTaskListGroup(state) {
      DataController.retrieveTaskListGroup().then((res) => {
        this.state.taskListGroup = res;
      });
    },
    createTask(state, obj) {
      const task = new Task(state.taskList.length, obj.title, obj.description);
      state.taskListGroup.find(taskList => taskList.id === obj.taskListId).addTask(task);
      Axios.put(taskEndpoint, task).then(res => state.taskList.push(task));
    },
    createTaskList(state, obj) {
      const taskList = new TaskList(state.taskListGroup.length, obj.title);
      Axios.put(taskListEndpoint, taskList).then(res => state.taskListGroup.push(taskList));
    },
    createUser(state, obj) {
      const user = new User(state.userList.length, obj.name);
      Axios.put(userEndpoint, user).then(res => state.userList.push(user));
    },
    addGeneralComment(state, obj) {
      const message = new Message(this.getters.currentUser, obj);
      state.commentList.push(message);
    },
    addTaskComment(state, obj) {
      const selectedTask = state.taskList.find(task => obj.taskId === task.id);
      const message = new Message(this.getters.currentUser, obj.content);
      selectedTask.addComment(message);
    },
    updateTask(state, obj) {
      const task = state.taskList.find(currentTask => obj.id === currentTask.id);
      task.updateContent(
        obj.title,
        obj.description,
      );
      Axios.post(taskEndpoint, task);
    },
    updateTaskListTitle(state, obj) {
      const taskList = state.taskListGroup.find(pointer => pointer.id === obj.id);
      if (taskList) taskList.title = obj.title;
    },
    updateTaskPlace(state, obj) {
      state.taskListGroup
        .find(taskList => taskList.id === obj.taskListId)
        .updateTaskList(obj.taskList);
    },
    updateTaskListPlace(state, obj) {
      this.state.taskListGroup = obj;
    },
    unselectTasks(state) {
      this.getters.currentUser.selectedTask = -1;
    },
    selectTask(state, id) {
      this.state.userList.find(user => user.id === state.currentUserId).selectedTask = id;
    },
  },
});

export default store;
