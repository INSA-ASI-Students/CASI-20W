class Task {
  constructor(id = -1, title = '', description = '', taskListId = -1) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.taskListId = taskListId;
    this.isSelected = false;
    this.creationDate = new Date();
    this.lastUpdate = this.creationDate;
    this.commentList = [];
  }

  getInformation() {
    return this.id;
  }

  updateContent(title, description) {
    this.title = title;
    this.description = description;
    this.lastUpdate = new Date();
  }

  addComment(message) {
    this.commentList.push(message);
  }
}

module.exports = Task;
