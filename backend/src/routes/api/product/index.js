import ProductStore from "../../../model/Product/Store/InMemoryProductStore.js";

const productStore = new ProductStore();

const createProduct = async (req, res) => {
  const { category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const author = req.session.user;

  const newProduct = await productStore.createProduct({
    category,
    title,
    content,
    cost,
    location,
    images,
    author,
  });

  return res.json({ product: newProduct });
};

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
  const { id, category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const updatedProduct = await productStore.updateProduct({
    id,
    category,
    title,
    content,
    cost,
    location,
    images,
  });

  return res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const author = req.session.user;

  const newProduct = await productStore.updateProduct({
    category,
    title,
    content,
    cost,
    location,
    images,
    author,
  });

  return res.json({ product: newProduct });
};

const productApi = {
  createProduct,
  getProducts,
  getProduct,
  getCategories,
  uploadFile,
  updateProduct,
  deleteProduct,
};

export default productApi;
