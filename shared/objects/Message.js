class Message {
  constructor(user, content) {
    this.user = user;
    this.date = new Date();
    this.content = content;
  }
}

module.exports = Message;
