import AbstractProductStore from "../AbstractProductStore.js";

const categoryList = [
  { id: 1, name: "디지털 기기" },
  { id: 2, name: "생활과전" },
];

const testImage1 =
  "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";
const testImage2 =
  "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE";

const productList = [
  {
    id: 1,
    category: 1,
    author: "testuser",
    title: "예시1",
    content: "팝니다. 싸게",
    cost: 100000, // 원
    location: "역삼동",
    thumbnail: testImage1,
    image: [testImage1, testImage2],
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: null,
    countOfView: 10,
    countOfChat: 2,
    countOfInterested: 4,
    isInterested: false,
  },
  {
    id: 2,
    category: 2,
    author: "testuser",
    title: "예시2",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "범박동",
    thumbnail: testImage2,
    image: [testImage1, testImage2],
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: null,
    countOfView: 10,
    countOfChat: 2,
    countOfInterested: 4,
    isInterested: false,
  },
];

export default class InMemmoryProductStore extends AbstractProductStore {
  async getProductByCategoryAndLocation({ location, category }) {
    const result = [];
    category = Number(category);
    productList.forEach((p) => {
      if (p.category === category && p.location === location) {
        result.push(p);
      }
    });

    return result;
  }
  async getProductById({ id }) {
    id = Number(id);
    const result = productList.find((p) => p.id === id);
    if (!result) {
      return null;
    }
    return result;
  }
  async getCategories() {
    return categoryList;
  }
  async deleteProductById({ id }) {
    id = Number(id);
    const productIndex = productList.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return false;
    }
    productList.splice(productIndex);
    return true;
  }
}