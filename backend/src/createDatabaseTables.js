import mysqlConnection from "./config/mysql.js";
import { createMockData } from "./mock/mockMySQLData.js";

mysqlConnection.connect(function (err) {
  if (err) throw err;
});

// Create account Table;
const account_table_create_query = `
CREATE TABLE IF NOT EXISTS account (
	username VARCHAR(255) PRIMARY KEY
)
`;
const account_table_create_query_result = await mysqlConnection
  .promise()
  .query(account_table_create_query);

// Create location Table;
const location_table_create_query = `
CREATE TABLE IF NOT EXISTS location(
  username VARCHAR(255),
  location VARCHAR(255),
  UNIQUE KEY usernamelocation (username, location),
  FOREIGN KEY (username)
  REFERENCES account(username) ON DELETE CASCADE
)
`;

const location_table_create_query_result = await mysqlConnection
  .promise()
  .query(location_table_create_query);

// CREATE category Table
const category_table_create_query = `
CREATE TABLE IF NOT EXISTS category (
	  id INT PRIMARY KEY,
    name VARCHAR(255),
    icon VARCHAR(255)
)
`;

const category_table_create_query_result = await mysqlConnection
  .promise()
  .query(category_table_create_query);

// CREATE product Table:
const product_table_create_query = `
CREATE TABLE IF NOT EXISTS product (
  id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  category INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  cost INT,
  status VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  countOfView INT DEFAULT(0),

  FOREIGN KEY (author) REFERENCES account (username),
  FOREIGN KEY (category) REFERENCES category (id)
)
`;

const product_table_create_query_result = await mysqlConnection
  .promise()
  .query(product_table_create_query);
// console.log(product_table_create_query_result[0]);

// CREATE interest_prodcut Table;

const interest_product_query = `
CREATE TABLE IF NOT EXISTS interest_product (
  username VARCHAR(255),
  id INT(10),

  PRIMARY KEY (username, id),
  FOREIGN KEY (username) REFERENCES account(username) ON DELETE CASCADE,
  FOREIGN KEY (id) REFERENCES product(id) ON DELETE CASCADE
)
`;
const interest_product_query_result = await mysqlConnection
  .promise()
  .query(interest_product_query);

// console.log(interest_product_query_result[0]);

// console.log(category_table_create_query_result[0]);

console.log("Complete Creating Tables");
process.exit(1);
