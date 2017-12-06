class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  getInformation() {
    return this.id;
  }
}

export default Task;
