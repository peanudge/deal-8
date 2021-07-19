import AbstractAccountStore from "../AbstractAccountStore.js";
import Account from "../Account.js";

import mysqlConnection from "../../../config/mysql.js";

export default class MySQLAccountStore extends AbstractAccountStore {
  async getAccount(username) {
    const query =
      "SELECT account.username as username, location.location as location FROM account LEFT JOIN location ON account.username = location.username where account.username=?";
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
      // TODO result 문서 확인 후 변경
      const accountResult = await mysqlConnection
        .promise()
        .query(query1, params1);
      const isAddedAccountRow = accountResult[0]?.affectedRows === 1;
      if (isAddedAccountRow) {
        const locationResult = await mysqlConnection
          .promise()
          .query(query2, params2);

        const isAddedLocationRow = locationResult[0]?.affectedRows === 1;
        if (isAddedLocationRow) {
          return true;
        }
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  async addLocation(username, location) {
    const query = "INSERT INTO location (username,location) VALUES (?,?);";
    const params = [username, location];

    try {
      const result = await mysqlConnection.promise().query(query, params);
      const isAddedLocation = result[0]?.affectedRows === 1;
      if (isAddedLocation) {
        return true;
      }
      return false;
    } catch (err) {
      return null;
    }
  }
  async removeLocation(username, location) {
    const query = "DELETE from location WHERE username=? AND location=?;";
    const params = [username, location];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const deleteResult = result[0]?.affectedRows === 1;
      if (deleteResult) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
