const mockProductData = [
  {
    id: 1,
    catrgory: 2,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 100000, // 원
    location: "상암동",
    thumbnail: "/static/image/1233422",
    image: "/static/image/1233422",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 10,
    isInterested: false,
  },
  {
    id: 1,
    catrgory: 2,
    author: "TESTER",
    title: "예시",
    content: "팝니다. 싸게",
    cost: 1000, // 원
    location: "상암동",
    thumbnail: "/static/image/1233422",
    image: "/static/image/1233422",
    createAt: new Date(), // db datetime type
    updateAt: new Date(),
    deleteAt: new Date(),
    countOfView: 10,
    countOfChat: 2,
    countOfInterest: 0,
    isInterested: true,
  },
];

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mockProductData);
      } catch (err) {
        reject(err);
      }
    }, 500);
  });
};
