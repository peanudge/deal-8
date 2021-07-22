import mysqlConnection from "./config/mysql.js";

mysqlConnection.connect(function (err) {
  if (err) throw err;
});

// Insert example accounts;
const example_account_insert_qeury = `
    INSERT INTO account(username) VALUES("testuser"), ("woowahan"), ("UserA"), ("UserB");
`;
const example_account_insert_qeury_result = await mysqlConnection
  .promise()
  .query(example_account_insert_qeury);

console.log("Complete Insert Example Accounts!");

// Insert example locations;
const example_locations_insert_qeury = `
    INSERT INTO location(username, location) VALUES("testuser", "동천동"), ("woowahan", "상암동"), ("UserA", "A"), ("UserB", "B");
`;
const example_locations_insert_qeury_result = await mysqlConnection
  .promise()
  .query(example_locations_insert_qeury);

console.log("Complete Insert Example Location!");

// Insert example products;

const testImageURL =
  "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";
const example_product_insert_query = `
INSERT INTO product
    (author, category, title, content, cost, status, location, thumbnail, createdAt, updatedAt) 
    VALUES ("UserA", 1, "팝니다. 싸게", "내용입니다.",30000, "SAIL", "A", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 1, "Category 1, A 배고픈 TEST", "내용입니다.",30000, "SAIL", "A", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 1, "Category 1, A 사람 TEST", "내용입니다.",30000, "SAIL", "A", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 1, "Category 1, A 구합니다. TEST", "내용입니다.",30000, "SAIL", "A", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 2, "Category 2, B TEST", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 0, "Category 0, B TEST", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 0, "Category 0, B", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;
const example_product_insert_query_result = await mysqlConnection
  .promise()
  .query(example_product_insert_query);

// Insert example product_image
const example_product_image_insert_query = `
INSERT INTO product_image(id, image) VALUES 
(1, "${testImageURL}"),
(2, "${testImageURL}"),
(3, "${testImageURL}"),
(4, "${testImageURL}"),
(5, "${testImageURL}"),
(6, "${testImageURL}"),
(7, "${testImageURL}");
`;
const example_product_image_insert_query_result = await mysqlConnection
  .promise()
  .query(example_product_image_insert_query);

// Insert example interest_product;
const example_interest_product_insert_query = `
INSERT INTO interest_product(username, id)
    VALUES("woowahan", 1),("woowahan", 2), ("testuser", 1);
`;

const example_interest_product_insert_query_result = await mysqlConnection
  .promise()
  .query(example_interest_product_insert_query);
console.log("Complete Insert Example Products!");

// INSERT example chatroom;

const example_chatroom_insert_qeury = `
INSERT INTO chatroom(productId) VALUES(1),(2);
`;
const example_chatroom_insert_qeury_result = await mysqlConnection
  .promise()
  .query(example_chatroom_insert_qeury);

const example_chatroom_attend_insert_qeury = `
INSERT INTO chatroom_attend(roomId, username) VALUES 
(1, "testuser"),(1, "woowahan"),
(2, "testuser"),(2, "UserA")
`;
const example_chatroom_attend_insert_qeury_result = await mysqlConnection
  .promise()
  .query(example_chatroom_attend_insert_qeury);

const example_chat_insert_query = `
INSERT INTO chat(roomId, content, writer) VALUES
(1, "THIS IS TEST1", "testuser"),
(1, "THIS IS TEST2", "woowahan")
`;
const example_chat_insert_query_result = await mysqlConnection
  .promise()
  .query(example_chat_insert_query);

console.log("Complete Insert Example ChatRoom!");

process.exit(1);
