import AbstractProductStore from "../AbstractProductStore.js";
import mysqlConnection from "../../../config/mysql.js";

export default class MySQLProductStore extends AbstractProductStore {
  async createProduct(product) {
    const {
      author,
      category,
      title,
      content,
      cost,
      status,
      location,
      images,
      createdAt,
      updatedAt,
    } = product;

    const addProductQuery = `
    INSERT INTO product
    (author, category, title, content, cost, status, location, thumbnail, createdAt, upadtedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const params = [
      author,
      category,
      title,
      content,
      cost,
      status,
      location,
      images[0],
      createdAt,
      updatedAt,
    ];

    try {
      const result = await mysqlConnection
        .promise()
        .query(addProductQuery, params);
      const isSuccess = result[0]?.affectedRows === 1;
      if (isSuccess) {
        product.id = result[0].insertId;
        return product;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async getProducts({ location, category, username }) {}
  async getProductById(id) {}
  async getCategories() {}
  async updateProduct(product) {}
  async deleteProductById(id) {}
  async getInterestProducts(username) {}
  async addInterestProduct(username, productId) {}
  async removeInterestProduct(username, productId) {}
}
