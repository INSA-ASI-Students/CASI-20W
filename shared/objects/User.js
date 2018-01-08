class User {
  constructor(id, name, password, document = undefined) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.selectedTask = -1;
    this.document = document;
  }
}

module.exports = User;
