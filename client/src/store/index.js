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
      context.commit('retrieveUsers');
      context.commit('retrieveMessages');
      context.commit('retrieveBoardGroup');
    },
  },
  mutations: {
    retrieveBoardGroup(state) {
      BoardRessource.retrieveBoardGroup().then((res) => {
        if (res.length !== 0) {
          this.state.boardGroup = res;
        } else {
          BoardRessource
            .addBoard({})
            .then(() => {
              this.commit('retrieveBoardGroup');
            });
        }
      });
    },
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
        this.state.userList = res;
      });
    },
    retrieveMessages(state) {
      MessageRessource.retrieveMessages().then((res) => {
        this.state.commentList = res;
      });
    },
    addBoard(state, obj) {
      const board = new Board(obj.id, obj.title);
      state.boardGroup.push(board);
    },
    addTask(state, obj) {
      const task = new Task(
        obj.id,
        obj.title,
        obj.description,
        obj.creationDate,
        obj.lastUpdate,
        obj.commentList,
        obj.document,
      );
      const taskListGroup = state.taskListGroup.find(taskList => taskList.id === obj.taskListId);
      taskListGroup.addTask(task);
      state.taskList.push(task);
      // TaskListRessource.updateTaskList(taskListGroup);
    },
    addTaskList(state, obj) {
      const taskList = new TaskList(obj.id, obj.title, obj.taskList, obj.document);
      const board = state.boardGroup.find(taskListGroup => taskListGroup.id === 1);
      board.addTaskList(taskList);
      state.taskListGroup.push(taskList);
      BoardRessource.updateBoard(board);
    },
    addUser(state, obj) {
      const user = new User(obj.id, obj.name, obj.password, obj.document);
      state.userList.push(user);
    },
    addGeneralComment(state, obj) {
      const message = new Message(this.getters.currentUser, obj);
      state.commentList.push(message);

      // Put message
      // MessageRessource.addMessage(message);
    },
    addTaskComment(state, obj) {
      const selectedTask = state.taskList.find(task => obj.taskId === task.id);
      const message = new Message(this.getters.currentUser, obj.content);
      selectedTask.addComment(message);

      // Update task
      // TaskRessource.updateTask(selectedTask);
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
      // TaskRessource.updateTask(task);
    },
    updateUser(state, obj) {

    },
    updateTaskListTitle(state, obj) {
      const taskList = state.taskListGroup.find(pointer => pointer.id === obj.id);
      if (taskList) {
        taskList.title = obj.title;
        // TaskListRessource.updateTaskList(taskList);
      }
    },
    updateTaskPlace(state, obj) {
      const taskListToUpdate = state.taskListGroup
        .find(taskList => taskList.id === obj.taskListId);
      taskListToUpdate.updateTaskList(obj.taskList);
      // TaskListRessource.updateTaskList(taskListToUpdate);
    },
    updateTaskListPlace(state, obj) {
      this.state.taskListGroup = obj;
    },
    unselectTasks(state) {
      this.getters.currentUser.selectedTask = -1;
    },
    selectTask(state, id) {
      const currentUser = this.state.userList.find(user => user.id === state.currentUserId);
      currentUser.selectedTask = id;
      // UserRessource.updateUser(currentUser);
    },
    setCurrentUserId(state, id) {
      this.state.currentUserId = id;
    },
  },
});

export default store;
