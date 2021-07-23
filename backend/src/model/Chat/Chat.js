export default class Chat {
  constructor(id, roomId, content, writer, createdAt) {
    this.id = id;
    this.roomId = roomId;
    this.content = content;
    this.writer = writer;
    this.createdAt = createdAt;
  }
}
