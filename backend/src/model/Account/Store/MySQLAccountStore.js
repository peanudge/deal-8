import AbstractAccountStore from "../AbstractAccountStore.js";
import Account from "../Account.js";

import mysqlConnection from "../../../config/mysql.js";

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
  async createAccount({ username, location }) {
    const query1 = `
      INSERT INTO account (username) VALUES (?);
    `;
    const params1 = [username];
    const query2 = `
      INSERT INTO location (username, location) VALUES (?,?);
    `;
    const params2 = [username, location];
    try {
      const accountResult = await mysqlConnection
        .promise()
        .query(query1, params1);
      if (accountResult) {
        const locationResult = await mysqlConnection
          .promise()
          .query(query2, params2);
        if (locationResult) {
          return true;
        }
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  async addLocation(username, location) {}
  async removeLocation(username, location) {}
}
