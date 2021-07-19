import AbstractAccountStore from "../AbstractAccountStore.js";
import Account from "../Account.js";

import { mysqlConnection } from "../../../app.js";

export default class MySQLAccountStore extends AbstractAccountStore {
  async getAccount(username) {
    const query =
      "SELECT * FROM account LEFT JOIN location ON account.username = location.username where account.username=?";
    const params = [username];
    let rows;
    try {
      const result = await mysqlConnection.promise().query(query, params);
      if (result[0].length === 0) {
        return null;
      } else {
        rows = result[0];
      }
    } catch (err) {
      return null;
    }

    const account = { username: rows[0].username, locations: [] };
    account.locations = rows.map((row) => row.location);
    return account;
  }
  async createAccount({ username, locations }) {}
  async addLocation(username, location) {}
  async removeLocation(username, location) {}
}
