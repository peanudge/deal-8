const getProducts = async (req, res) => {
  const { location, category } = req.query;
  console.log(location, category);
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
