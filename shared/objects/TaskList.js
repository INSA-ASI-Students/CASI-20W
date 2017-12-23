class TaskList {
  constructor(id = -1, title = null, taskList = []) {
    this.id = id;
    this.title = title;
    this.taskList = taskList;
  }

  addTask(task) {
    this.taskList.push(task.id);
  }

  updateTaskList(taskList) {
    this.taskList = taskList;
  }
}

module.exports = TaskList;
