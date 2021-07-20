import AbstractChatStore from "../AbstractChatStore";

export default class InMemmoryChatStore extends AbstractChatStore {
  createRoom(buyer, seller, producId) {}
  createChat(roomKey, message, writter) {}
  getChats(roomKey) {}
  getRoomByRoomKey(roomKey) {}
  getRoomsByProductId(productId) {}
  deleteChatRoom(roomKey) {}
}
