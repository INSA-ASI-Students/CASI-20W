class User {
  constructor(id, name, document = undefined) {
    this.id = id;
    this.name = name;
    this.selectedTask = -1;
    this.document = document;
  }
}

module.exports = User;
