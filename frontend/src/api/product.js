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

export const uploadProductImagesAsync = (files) => {
  return new Promise((resolve, _) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("product_image", file));
    const request = fetch("/api/product/media", {
      method: "POST",
      body: formData,
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
  images = [],
}) => {
  return new Promise((resolve, reject) => {
    const request = fetch("/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        cost,
        comment,
        images,
        location,
        category,
      }),
    }).then((response) => response.json());
    resolve(request);
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
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};
