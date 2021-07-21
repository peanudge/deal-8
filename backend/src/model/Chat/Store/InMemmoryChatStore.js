import AbstractChatStore from "../AbstractChatStore.js";

const rooms = [
  {
    key: "550e8400-e29b-41d4-a716-446655440000",
    targetUser: "UserA",
    productId: 0,
    unReadCount: 1,
    productThumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    lastChat: {
      id: 1233423,
      room: "550e8400-e29b-41d4-a716-446655440000",
      message: "실제로 신어볼 수 있는 건가요?",
      writer: "UserB",
      createAt: new Date().toDateString(),
    },
  },
  {
    key: "550e8400-e29b-41d4-a716-446655440000",
    targetUser: "UserC",
    productId: 0,
    unReadCount: 0,
    productThumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    lastChat: {
      id: 1233423,
      room: "550e8400-e29b-41d4-a716-446655440000",
      message: "에누리점",
      writer: "UserC",
      createAt: new Date().toDateString(),
    },
  },
];

export default class InMemmoryChatStore extends AbstractChatStore {
  createRoom(buyer, seller, producId) {}
  createChat(roomKey, message, writter) {}
  getChats(roomKey) {}
  getRoomByRoomKey(roomKey) {}
  getRoomsByProductId(productId, username) {}
  deleteChatRoom(roomKey) {}
}
