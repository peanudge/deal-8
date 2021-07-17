const mockProductData = [
  {
    id: 1,
    catrgory: 1,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 100000, // 원
    location: "상암동",
    thumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    image:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 10,
    isInterested: false,
  },
  {
    id: 2,
    catrgory: 2,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "상암동",
    thumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    image:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 0,
    isInterested: true,
  },
  {
    id: 3,
    catrgory: 3,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "상암동",
    thumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    image:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 0,
    isInterested: true,
  },
  {
    id: 3,
    catrgory: 3,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "상암동",
    thumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    image:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 0,
    isInterested: true,
  },
  {
    id: 3,
    catrgory: 3,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "상암동",
    thumbnail:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    image:
      "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 0,
    isInterested: true,
  },
];

export const getProducts = (
  conditions = { categoryId: null, location: null }
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (conditions.categoryId) {
          resolve(filteredData);
        } else {
          resolve(mockProductData);
        }
      } catch (err) {
        reject(err);
      }
    }, 500);
  });
};

export const getAllProductsAsync = () => {
  return getProducts();
};

export const getMySalingProductsAsync = () => {
  // GET /account/me/product
  return getProducts();
};

export const getMyInterestProductsAsync = () => {
  // GET /account/me/interest
  return getProducts();
};

export const getProductDetail = ({ id }) => {
  return new Promise((resolve, reject) => {
    const result = {
      id: id,
      images: [
        "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
        "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
        "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
      ],
      status: "SOLD",
      title: "빈티지 롤러 스케이트",
      category: {
        id: 1,
        name: "디지털 기기",
        icon: "",
      },
      updateAt: new Date(),
      content: "싸게 팝니다~",
      countOfView: 10,
      countOfChat: 2,
      countOfInterest: 10,
      author: "Woowahan",
      location: "역삼동",
      isInterested: true,
    };

    resolve(result);
  });
};
