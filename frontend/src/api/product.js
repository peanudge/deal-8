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
      if (categoryId) {
        url += `&location=${location}`;
      } else {
        url += `location=${location}`;
      }
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

export const getProductDetailAsync = ({ id }) => {
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/product/detail?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
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

export const updateProductStatusAsync = (productId, status) => {
  return new Promise((resolve, _) => {
    const request = fetch(`/api/product/${productId}/status?status=${status}`, {
      method: "PUT",
      headers: {
        "Contents-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};
