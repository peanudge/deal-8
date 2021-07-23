export default class ChatRoomListItem {
  constructor(roomId, username, thumbnail, content, createdAt) {
    this.roomId = roomId;
    this.username = username;
    this.thumbnail = thumbnail;
    this.content = content;
    this.createdAt = createdAt;
  }
}
