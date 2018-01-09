class User {
  constructor(id, name, password, document = undefined, selectedTask = -1) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.selectedTask = selectedTask;
    this.document = document;
  }

  update(name, selectedTask) {
    this.name = name;
    this.selectedTask = selectedTask;
  }
}

module.exports = User;
