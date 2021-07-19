export const getProductsAsync = (
  conditions = { categoryId: null, location: null }
) => {
  return new Promise((resolve, reject) => {
    const { categoryId, location } = conditions;
    let url = "/api/product?";
    if (categoryId) {
      url += `category=${categoryId}`;
    }
    if (location && location !== "") {
      url += `&location=${location}`;
    }
    const request = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};

export const getAllProductsAsync = () => getProductsAsync();

export const getMySalingProductsAsync = () => {
  // GET /account/me/product
  return getProductsAsync();
};

export const getMyInterestProductsAsync = () => {
  // GET /account/me/interest
  return getProductsAsync();
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

export const createProductAsync = ({
  title,
  cost,
  comment,
  location,
  category,
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Create Product Post -", title);
      resolve({ success: true, id: 1 });
    }, 500);
  });
};

export const getCategoriesAsync = () =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/product/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
