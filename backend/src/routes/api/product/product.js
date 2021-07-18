import ProductStore from "../../../model/Product/Store/InMemoryProductStore.js";

const productStore = new ProductStore();

const getProducts = async (req, res) => {
  const { location, category } = req.query;
  const products = await productStore.getProductByCategoryAndLocation({
    location,
    category,
  });

  return res.json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.query;
  const product = await productStore.getProductById({ id });
  return res.json(product);
};

const getCategories = async (req, res) => {
  const categories = await productStore.getCategories();
  return res.json(categories);
};

const uploadFile = async (req, res) => {
  res.send("test");
};

const updateProduct = async (req, res) => {
  const { catrgory, title, content, cost, address } = req.body;
  // TODO auth middleware
  const author = req.session.user;
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  productStore.deleteProductById({ id });
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
