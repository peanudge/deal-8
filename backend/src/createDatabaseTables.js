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

// CREATE product_image Table;

const product_image_table_create_query = `
  CREATE TABLE IF NOT EXISTS product_image (
    id INT(10),
    image VARCHAR(255),
    FOREIGN KEY (id) REFERENCES product (id) ON DELETE CASCADE
  )
`;
const product_image_table_create_query_result = await mysqlConnection
  .promise()
  .query(product_image_table_create_query);

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

// CREATE chatroom Table

const chatroom_query = `
CREATE TABLE chatroom (
  roomId INT PRIMARY KEY AUTO_INCREMENT,
  productId INT,
  FOREIGN KEY(productId) REFERENCES product(id)
)
`;
const chatroom_query_result = await mysqlConnection
  .promise()
  .query(chatroom_query);

// CREATE chatroom_attend Table
const chatroom_attend_query = `
CREATE TABLE chatroom_attend (
  roomId INT,
  username VARCHAR(255),
  isAttend BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY(roomId) REFERENCES chatroom(roomId)
)
`;
const chatroom_attend_query_result = await mysqlConnection
  .promise()
  .query(chatroom_attend_query);

// CREATE chat Table

const chat_query = `
CREATE TABLE chat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT,
  content VARCHAR(255),
  writer VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(roomId) REFERENCES chatroom(roomId),
  FOREIGN KEY(writer) REFERENCES account(username)
)
`;
const chat_query_result = await mysqlConnection.promise().query(chat_query);

console.log("Complete Creating Tables");

// Insert init category;
const init_category_insert_query = `
INSERT INTO category(id, name) 
VALUES
(0,"디지털 기기"),
(1,"게임/취미"),
(2,"여성패션/잡화"),
(3,"뷰티/미용"),
(4,"생활 가전"),
(5,"생활/가공식품"),
(6,"남성패션/잡화"),
(7,"반려동물"),
(8,"가구 인테리어"),
(9,"스포츠/레저"),
(10,"유아동"),
(11,"도서/티켓");
`;

const init_category_insert_query_result = await mysqlConnection
  .promise()
  .query(init_category_insert_query);

console.log("Complete Insert init Categories!");

process.exit(1);
