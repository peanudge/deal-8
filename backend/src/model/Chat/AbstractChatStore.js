export default class AbstractChatStore {
  getRoomsByUsername(username) {}
  getRoomsByProductId(usernaem, productId) {}
  createAttendUser(roomId, username) {}
  createChat(roomId, message, writter) {}
  getChats(roomId) {}
  getRoomByRoomId(roomId) {}
}
