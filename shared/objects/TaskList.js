class TaskList {
  constructor(id) {
    this.id = id;
    this.title = null;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  updateTaskList(taskList) {
    this.taskList = taskList;
  }
}

module.exports = TaskList;
