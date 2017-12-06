class Task {
  constructor(id, title, description, taskListId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.taskListId = taskListId;
  }

  getInformation() {
    return this.id;
  }
}

export default Task;
