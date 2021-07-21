export default class Store {
  constructor(roomId) {
    this.account = null;
    this.roomId = roomId;
    this.product = null;
    this.chatLogs = [];
    this.totalMessageCount = 0;
  }
}
