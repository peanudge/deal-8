export default class AbstractProductStore {
  createProduct({ category, title, content, cost, location, author, images }) {}
  getProducts({ location, category }) {}
  getProductById(id) {}
  updateProduct({ id, category, title, content, cost, location, images }) {}
  updateProductStatus(status) {}
  deleteProductById(id) {}
  getInterestProducts(username) {}
  isInterestProduct(username, productId) {}
  getOwnProducts(username) {}
  addInterestProduct(username, productId) {}
  removeInterestProduct(username, productId) {}
  addCountOfViewProduct(id) {}
}
