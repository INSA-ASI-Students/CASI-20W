/* eslint no-unused-vars: "off" */

import Vue from 'vue';
import Vuex from 'vuex';

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
    currentUser: defaultUser,
    taskCount: 0,
    taskListCount: 0,
    userCount: 1,
    taskListGroup: [],
    taskList: [],
    userList: [ defaultUser ],
    commentList: [],
  },
  mutations: {
    createTask(state, obj) {
      state.taskCount = state.taskCount + 1;
      const task = new Task(state.taskCount, obj.title, obj.description, obj.taskListId);
      state.taskList.push(task);
    },
    createTaskList(state, obj) {
      state.taskListCount = state.taskListCount + 1;
      const taskList = new TaskList(state.taskListCount, obj.title);
      state.taskListGroup.push(taskList);
    },
    createUser(state, obj) {
      state.userCount = state.user + 1;
      const user = new User(state.userCount, obj.name);
      state.userList.push(user);
    },
    addGeneralComment(state, obj) {
      const message = new Message(state.currentUser, obj);
      state.commentList.push(message);
    },
    addTaskComment(state, obj) {
      const task = state.taskList.find(task => obj.taskId === task.id);
      const message = new Message(state.currentUser, obj.content);
      task.addComment(message);
    },
    updateTaskListTitle(state, obj) {
      const taskList = state.taskListGroup.find(pointer => pointer.id === obj.id);
      if (taskList) taskList.title = obj.title;
    },
    unselectTasks(state) {
      const selectedTasks = state.taskList.filter(task => task.isSelected);
      for (let i = 0; i < selectedTasks.length; i++) selectedTasks[i].isSelected = false;
    },
    selectTask(state, id) {
      const selectedTasks = state.taskList.filter(task => task.isSelected);
      for (let i = 0; i < selectedTasks.length; i++) selectedTasks[i].isSelected = false;
      state.taskList.find(task => task.id === id).isSelected = true;
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
