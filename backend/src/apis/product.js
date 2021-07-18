import ProductStore from "../model/Product/Store/InMemoryProductStore.js";

const productStore = new ProductStore();

const getProducts = async (req, res) => {
  const { location, category } = req.query;
  const products = productStore.getProductByCategoryAndLocation({
    location,
    category,
  });

  return res.json(products);
};

const getProduct = async (req, res) => {
  res.send("test");
};

const getCategories = async (req, res) => {
  res.send("test");
};

const uploadFile = async (req, res) => {
  res.send("test");
};

const updateProduct = async (req, res) => {
  res.send("test");
};

const deleteProduct = async (req, res) => {
  res.send("test");
};

const productApi = {
  getProducts,
  getProduct,
  getCategories,
  uploadFile,
  updateProduct,
  deleteProduct,
};

export default productApi;
