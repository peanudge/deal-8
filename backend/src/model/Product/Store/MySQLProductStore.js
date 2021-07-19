import AbstractProductStore from "../AbstractProductStore.js";
import mysqlConnection from "../../../config/mysql.js";

export default class MySQLProductStore extends AbstractProductStore {
  async createProduct({
    category,
    title,
    content,
    cost,
    location,
    author,
    images,
  }) {}
  async getProductByCategoryAndLocation({ location, category }) {}
  async getProductById(id) {}
  async getCategories() {}
  async updateProduct(product) {}
  async deleteProductById(id) {}
  async getInterestProducts(username) {}
  async addInterestProduct(username, productId) {}
  async removeInterestProduct(username, productId) {}
}
