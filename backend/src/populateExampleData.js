import mysqlConnection from "./config/mysql.js";

mysqlConnection.connect(function (err) {
  if (err) throw err;
});

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
    ("UserB", 1, "Category 1, A TEST", "내용입니다.",30000, "SAIL", "A", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 2, "Category 2, B TEST", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 0, "Category 0, B TEST", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("UserB", 0, "Category 0, B", "내용입니다.",30000, "SAIL", "B", "${testImageURL}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
`;
const example_product_insert_query_result = await mysqlConnection
  .promise()
  .query(example_product_insert_query);

// Insert example interest_product;
const example_interest_product_insert_query = `
INSERT INTO interest_product(username, id)
    VALUES("woowahan", 1),("woowahan", 2), ("testuser", 1);
`;

const example_interest_product_insert_query_result = await mysqlConnection
  .promise()
  .query(example_interest_product_insert_query);
console.log("Complete Insert Example Products!");
