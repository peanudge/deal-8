export default class AbstractProductStore {
  createProduct({ category, title, content, cost, location, author, images }) {}
  getProducts({ location, category }) {}
  getProductById(id) {}
  getCategories() {}
  updateProduct({ id, category, title, content, cost, location, images }) {}
  deleteProductById(id) {}
  getInterestProducts(username) {}
  addInterestProduct(username, productId) {}
  removeInterestProduct(username, productId) {}
}
