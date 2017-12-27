class TaskList {
  constructor(id = -1, title = null, taskList = [], document = undefined) {
    this.id = id;
    this.title = title;
    this.taskList = taskList;
    this.document = document;
  }

  addTask(task) {
    this.taskList.push(task.id);
  }

  updateTaskList(taskList) {
    this.taskList = taskList;
  }
}

module.exports = TaskList;
