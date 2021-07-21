import AbstractCategoryStore from "../AbstractCategoryStore.js";
import mysqlConnection from "../../../config/mysql.js";
import Category from "../Category.js";
import { compile } from "morgan";

export default class MySQLCategoryStore extends AbstractCategoryStore {
  async getCategories() {
    const query = "SELECT id, name FROM category;";
    try {
      const result = await mysqlConnection.promise().query(query);
      const rows = result[0];
      return rows.map((row) => new Category(row.id, row.name));
    } catch (err) {
      throw err;
    }
  }

  async getCategory(id) {
    const query = "SELECT id, name FROM category WHERE id = ?";
    const params = [id];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];

      if (rows.length > 0) {
        return new Category(rows[0].id, rows[0].name);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async addCategory(id, name) {
    const query = "INSERT INTO category(id, name) VALUES(?, ?)";
    const params = [id, name];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isSuccess = result[0]?.affectedRows === 1;
      if (isSuccess) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
}
