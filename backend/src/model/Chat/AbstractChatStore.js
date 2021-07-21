export default class AbstractChatStore {
  getChatRoom(roomId) {}
  getChatRoomAttend(username, productId) {}
  createChatRoom(currentUsername, targetUsername, productId) {}
  getChats(roomId, count = 20) {}
  addChat(roomdId, content, writer, createdAt) {}
}
