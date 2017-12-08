class Task {
  constructor(id, title, description, taskListId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.taskListId = taskListId;
    this.isSelected = false;
  }

  getInformation() {
    return this.id;
  }
}

export default Task;
