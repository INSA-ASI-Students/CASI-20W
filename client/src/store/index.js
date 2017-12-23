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

Vue.use(Vuex);

const defaultUser = new User(1, 'anonymous');

const store = new Vuex.Store({
  state: {
    currentUserId: defaultUser.id,
    taskCount: 0,
    taskListCount: 0,
    userCount: 1,
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
  mutations: {
    createTask(state, obj) {
      this.state.taskCount = state.taskCount + 1;
      const task = new Task(state.taskCount, obj.title, obj.description);
      state.taskListGroup.find(taskList => taskList.id === obj.taskListId).addTask(task);
      state.taskList.push(task);
    },
    createTaskList(state, obj) {
      this.state.taskListCount = state.taskListCount + 1;
      const taskList = new TaskList(state.taskListCount, obj.title);
      state.taskListGroup.push(taskList);
    },
    createUser(state, obj) {
      this.state.userCount = state.user + 1;
      const user = new User(state.userCount, obj.name);
      state.userList.push(user);
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
    saveTask(state, obj) {
      state.taskList.find(task => obj.id === task.id).updateContent(
        obj.title,
        obj.description,
      );
    },
  },
});

export default store;
