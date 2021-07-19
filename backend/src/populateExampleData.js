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

console.log("Complete Insert Example Products!");

// Insert example products;

// Insert example interest_product;
