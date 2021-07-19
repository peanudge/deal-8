import AbstractCategoryStore from "../AbstractCategoryStore.js";
import mysqlConnection from "../../../config/mysql.js";
import Category from "../Category.js";

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
