export default class AbstractProductStore {
  createProduct({ category, title, content, cost, location, author, images }) {}
  getProductByCategoryAndLocation({ location, category }) {}
  getProductById(id) {}
  getCategories() {}
  updateProduct({ id, category, title, content, cost, location, images }) {}
  deleteProductById(id) {}
}
