class Board {
  constructor(id = -1, title = null, taskLists = [], users = [], document = undefined) {
    this.id = id;
    this.title = title;
    this.taskLists = taskLists;
    this.users = users;
    this.document = document;
  }

  addTaskList(taskList) {
    this.taskLists.push(taskList.id);
  }

  addUser(user) {
    this.users.push(user.id);
  }
}

module.exports = Board;
