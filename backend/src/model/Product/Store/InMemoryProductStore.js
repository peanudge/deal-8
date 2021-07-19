import AbstractProductStore from "../AbstractProductStore.js";
import Product from "../Product.js";

const categoryList = [
  {
    name: "디지털 기기",
    id: 1,
  },
  {
    name: "게임/취미",
    id: 2,
  },
  {
    name: "여성패션/잡화",
    id: 3,
  },
  {
    name: "뷰티/미용",
    id: 4,
  },
  {
    name: "생활 가전",
    id: 5,
  },
  {
    name: "생활/가공식품",
    id: 6,
  },
  {
    name: "남성패션/잡화",
    id: 7,
  },
  {
    name: "반려동물",
    id: 8,
  },
  {
    name: "가구 인테리어",
    id: 9,
  },

  {
    name: "스포츠/레저",
    id: 10,
  },

  {
    name: "유아동",
    id: 11,
  },
  {
    name: "도서/티켓/음반",
    id: 12,
  },
];

const testImage1 =
  "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";
const testImage2 =
  "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE";

const productData = [
  new Product({
    id: 0,
    category: 1,
    author: "testuser",
    title: "예시1",
    content: "팝니다. 싸게",
    cost: 100000, // 원
    location: "역삼동",
    thumbnail: testImage1,
    images: [testImage1, testImage2],
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
    author: "testuser",
    title: "예시2",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "범박동",
    thumbnail: testImage2,
    images: [testImage1, testImage2],
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: null,
    countOfView: 10,
    countOfChat: 2,
    countOfInterested: 4,
    isInterested: true,
  }),
];

const interestProductData = [
  {
    username: "testuser",
    productId: 0,
  },
];

export default class InMemmoryProductStore extends AbstractProductStore {
  async createProduct({
    category,
    title,
    content,
    cost,
    location,
    author,
    images,
  }) {
    let thumbnail;
    if (!images || images?.length === 0) {
      thumbnail = null;
      images = [];
    } else {
      thumbnail = images[0];
    }
    const newProduct = new Product({
      id: productData.length,
      category,
      author,
      title,
      content,
      cost,
      location,
      thumbnail,
      images,
      createAt: new Date(),
      updateAt: new Date(),
      deleteAt: null,
      countOfView: 0,
      countOfChat: 0,
      countOfInterested: 0,
      isInterested: false,
    });

    productData.push(newProduct);
    return newProduct;
  }

  async getProductByCategoryAndLocation({
    location = undefined,
    category = undefined,
  }) {
    const compareFunc = (target, location, category) => {
      let locationCompared = target.location === location;
      let categoryCompared = target.category === category;

      if (!location) {
        locationCompared = true;
      }

      if (!category) {
        categoryCompared = true;
      }

      return locationCompared && categoryCompared;
    };

    category = Number(category);

    const result = productData
      .filter((p) => compareFunc(p, location, category))
      .map((p) => {
        return new Product({
          id: p.id,
          category: p.category,
          author: p.author,
          title: p.title,
          cost: p.cost,
          images: p.images,
          location: p.location,
          thumbnail: p.thumbnail,
          createAt: p.createAt,
          updateAt: p.updateAt,
          countOfView: p.countOfView,
          countOfChat: p.countOfChat,
          countOfInterested: p.countOfInterested,
          isInterested: p.isInterested,
        });
      });
    return result;
  }

  async getProductById(id) {
    id = Number(id);
    const result = productData.find((p) => p.id === id);
    if (!result) {
      return null;
    }
    return result;
  }

  async getCategories() {
    return categoryList;
  }

  async updateProduct({
    id,
    category,
    title,
    content,
    cost,
    location,
    images,
  }) {
    const targetIndex = productData.findIndex((product) => product.id === id);
    if (targetIndex === -1) {
      return null;
    }
    let thumbnail;

    if (!images || images?.length === 0) {
      thumbnail = null;
      images = [];
    } else {
      thumbnail = images[0];
    }

    const newProduct = productData[targetIndex];
    newProduct.category = category;
    newProduct.title = title;
    newProduct.content = content;
    newProduct.cost = cost;
    newProduct.location = location;
    newProduct.images = images;
    newProduct.thumbnail = thumbnail;

    productData[targetIndex] = newProduct;

    return newProduct;
  }

  async deleteProductById(id) {
    id = Number(id);
    const productIndex = productData.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return false;
    }
    productData.splice(productIndex);
    return true;
  }

  async getInterestProducts(username) {
    const interestInfoByUser = interestProductData.filter(
      (interest) => username === interest.username
    );

    const products = interestInfoByUser.map(({ productId }) =>
      productData.find((product) => product.id === productId)
    );

    return products;
  }

  async addInterestProduct(username, productId) {
    const originInterest = interestProductData.find(
      (data) => data.username === username && data.productId === productId
    );

    if (originInterest) {
      return false;
    }

    const product = productData.find((product) => product.id === productId);
    if (!product) {
      return false;
    }

    interestProductData.push({
      username,
      productId,
    });

    return true;
  }

  async removeInterestProduct(username, productId) {
    const originInterest = interestProductData.find(
      (data) => data.username === username && data.productId === productId
    );

    if (!originInterest) {
      return false;
    }

    const product = productData.find((product) => product.id === productId);
    if (!product) {
      return false;
    }

    interestProductData = interestProductData.filter((interest) => {
      return !(
        interest.username === username && interest.productId === productId
      );
    });

    return true;
  }
}
