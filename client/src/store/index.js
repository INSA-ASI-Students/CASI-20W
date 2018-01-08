/* eslint no-unused-vars: "off" */
/* eslint no-param-reassign: "off" */

import Vue from 'vue';
import Vuex from 'vuex';

import {
  Board,
  User,
  TaskList,
  Task,
  Message,
} from '../../../shared/index';

import BoardRessource from '../ressources/BoardRessource';
import MessageRessource from '../ressources/MessageRessource';
import TaskRessource from '../ressources/TaskRessource';
import TaskListRessource from '../ressources/TaskListRessource';
import UserRessource from '../ressources/UserRessource';
import receive from '../ressources/receive';

Vue.use(Vuex);

const defaultUser = new User(-1, 'anonymous');

const store = new Vuex.Store({
  plugins: [
    receive,
  ],
  state: {
    page: 'login',
    loginTab: 'sign-in',
    currentUserId: defaultUser.id,
    boardGroup: [],
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
      TaskRessource.retrieveTaskList().then((res) => {
        this.state.taskList = res;
      });
    },
    retrieveTaskListGroup(state) {
      TaskListRessource.retrieveTaskListGroup().then((res) => {
        this.state.taskListGroup = res;
      });
    },
    retrieveUsers(state) {
      UserRessource.retrieveUsers().then((res) => {
        this.state.taskList = res;
      });
    },
    addBoard(state, obj) {
      const board = new Board(state.boardGroup.length + 1, obj.title);
      state.taskListGroup.push(board);
    },
    addTask(state, obj) {
      const task = new Task(state.taskList.length + 1, obj.title, obj.description);
      state.taskListGroup.find(taskList => taskList.id === obj.taskListId).addTask(task);
      state.taskList.push(task);
    },
    addTaskList(state, obj) {
      const taskList = new TaskList(state.taskListGroup.length + 1, obj.title);
      state.taskListGroup.push(taskList);
    },
    addUser(state, obj) {
      const user = new User(obj.id, obj.name, obj.password);
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
    switchPage(state, obj) {
      state.page = obj.page;
    },
    switchLoginTab(state, obj) {
      state.loginTab = obj.loginTab;
    },
    updateTask(state, obj) {
      const task = state.taskList.find(currentTask => obj.id === currentTask.id);
      task.updateContent(
        obj.title,
        obj.description,
      );
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
    setCurrentUserId(state, id) {
      this.state.currentUserId = id;
    },
  },
});

export default store;
