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
const taskEndpoint = '/api/tasks';
const taskListEndpoint = '/api/taskLists';
const userEndpoint = '/api/users';

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
  actions: {
    retrieveData(context) {
      context.commit('retrieveTaskList');
      context.commit('retrieveTaskListGroup');
    },
  },
  mutations: {
    retrieveTaskList(state) {
      Axios.get(taskEndpoint).then((res) => {
        res.data.forEach((obj) => {
          const task = new Task(
            obj.id,
            obj.title,
            obj.description,
            new Date(obj.creationDate),
            new Date(obj.lastUpdate),
            obj.commentList,
          );
          this.state.taskCount = state.taskCount + 1;
          state.taskList.push(task);
        });
      });
    },
    retrieveTaskListGroup(state) {
      Axios.get(taskListEndpoint).then((res) => {
        res.data.forEach((obj) => {
          const taskList = new TaskList(
            obj.id,
            obj.title,
            obj.taskList,
          );
          this.state.taskListCount = state.taskListCount + 1;
          state.taskListGroup.push(taskList);
        });
      });
    },
    createTask(state, obj) {
      this.state.taskCount = state.taskCount + 1;
      const task = new Task(state.taskCount, obj.title, obj.description);
      state.taskListGroup.find(taskList => taskList.id === obj.taskListId).addTask(task);
      Axios.put(taskEndpoint, task).then(res => state.taskList.push(task));
    },
    createTaskList(state, obj) {
      this.state.taskListCount = state.taskListCount + 1;
      const taskList = new TaskList(state.taskListCount, obj.title);
      Axios.put(taskListEndpoint, taskList).then(res => state.taskListGroup.push(taskList));
    },
    createUser(state, obj) {
      this.state.userCount = state.user + 1;
      const user = new User(state.userCount, obj.name);
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
