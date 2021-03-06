class Task {
  constructor(
    id = -1,
    title = '',
    description = '',
    creationDate = new Date(),
    lastUpdate = new Date(),
    commentList = [],
    document = undefined,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.commentList = commentList;
    this.document = document;
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
