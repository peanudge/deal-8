export default class AbstractChatStore {
  createRoom(buyer, seller, producId) {}
  createChat(roomKey, message, writter) {}
  getChats(roomKey) {}
  getRoomByRoomKey(roomKey) {}
  getRoomsByProductId(productId) {}
  deleteChatRoom(roomKey) {}
}
