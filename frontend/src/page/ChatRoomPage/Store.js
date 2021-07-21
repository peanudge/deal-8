export default class Store {
  constructor(roomId) {
    this.account = null;
    this.roomId = roomId;
    this.product = null;
    this.chats = [];
    this.totalMessageCount = 0;
  }
}
