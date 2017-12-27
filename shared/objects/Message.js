class Message {
  constructor(user, content, document = undefined) {
    this.user = user;
    this.date = new Date();
    this.content = content;
    this.document = document;
  }
}

module.exports = Message;
