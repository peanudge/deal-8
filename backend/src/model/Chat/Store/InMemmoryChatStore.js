import AbstractChatStore from "../AbstractChatStore.js";
import Product from "../../Product/Product.js";

const roomList = [
  {
    roomId: 0,
    targetUser: "UserB",
    productId: 1,
    unReadCount: 1,
    productThumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    author: "UserA",
    lastChat: {
      roomId: 1233423,
      room: 0,
      message: "실제로 신어볼 수 있는 건가요?",
      writer: "UserB",
      createAt: new Date().toDateString(),
    },
  },
  {
    roomId: 1,
    targetUser: "UserC",
    productId: 1,
    unReadCount: 0,
    productThumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    author: "UserA",
    lastChat: {
      id: 1233423,
      roomId: 1,
      message: "에누리점",
      writer: "UserC",
      createAt: new Date().toDateString(),
    },
  },
];
const productData = [
  new Product({
    id: 0,
    category: 1,
    author: "testuser",
    title: "예시1",
    content: "팝니다. 싸게",
    cost: 100000, // 원
    location: "역삼동",
    thumbnail: "",
    images: [],
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: null,
    countOfView: 10,
    countOfChat: 2,
    countOfInterested: 4,
    isInterested: false, // isInterest 는 유저에 따라 달라야 합니다. (이건 테스트용이라 일단 구현하지 않았습니다.)
  }),
  new Product({
    id: 1,
    category: 2,
    author: "UserA",
    title: "예시2",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "범박동",
    thumbnail: "",
    images: [""],
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: null,
    countOfView: 10,
    countOfChat: 2,
    countOfInterested: 4,
    isInterested: true,
  }),
];

const userAttends = [
  { username: "UserA", roomId: 0, productId: 1 },
  { username: "UserA", roomId: 1, productId: 1 },
  { username: "UserB", roomId: 0, productId: 1 },
  { username: "UserC", roomId: 1, productId: 1 },
];

export default class InMemmoryChatStore extends AbstractChatStore {
  async getRoomsByProductId({ productId, username }) {
    productId = Number(productId);
    const results = roomList.filter(
      (room) => room.author === username && room.productId === productId
    );
    return results;
  }

  async getAttendInfo({ productId, username }) {
    productId = Number(productId);
    const attendInfo = userAttends.find(
      (userAttend) =>
        userAttend.productId === productId && userAttend.username === username
    );

    if (attendInfo === undefined) {
      return null;
    }
    return attendInfo;
  }

  async createRoom({ username, productId }) {
    const product = productData.find((product) => product.id === productId);
    console.log(product);
    if (product === undefined) {
      return null;
    }

    const newRoomId = rooms.length;

    const newAttends = [
      { username: product.author, roomId: newRoomId, productId: product.id },
      { username: username, roomId: newRoomId, productId: product.id },
    ];

    userAttends.push(newAttends);
    rooms.push({
      roomId: newRoomId,
      targetUser: "UserB",
      productId: product.id,
      unReadCount: 1,
      productThumbnail:
        "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
      author: "UserA",
      lastChat: {
        roomId: 1233423,
        room: 0,
        message: "실제로 신어볼 수 있는 건가요?",
        writer: product.author,
        createAt: new Date().toDateString(),
      },
    });
    console.log(newRoomId);

    return newRoomId;
  }
}
