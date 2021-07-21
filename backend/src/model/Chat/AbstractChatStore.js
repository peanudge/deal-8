export default class AbstractChatStore {
  getChatRoomsByProductId(productId, author) {}
  getChatRoom(roomId) {}
  getChatRoomAttend(username, productId) {}
  createChatRoom(currentUsername, targetUsername, productId) {}
  getChats(roomId, count = 20) {}
  addChat(roomdId, content, writer, createdAt) {}
}
