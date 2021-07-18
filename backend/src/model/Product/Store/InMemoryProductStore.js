import AbstractProductStore from "../AbstractProductStore.js";

const category = new Map();
const product = new Map();

category.set(1, "디지털 기기");
category.set(2, "생활가전");

const testImage1 =
  "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";
const testImage2 =
  "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE";

const tmpProduct = [
  {
    id: 1,
    catrgory: 1,
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
    catrgory: 2,
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

tmpProduct.forEach((p, index) => {
  product.set(p, index);
});

export default class InMemmoryProductStore extends AbstractProductStore {
  getProductByCategoryAndLocation({ location, category }) {
    console.log(product);
  }
  getProductById({ id }) {}
  getCategories() {}
  deleteProductById({ id }) {}
}
