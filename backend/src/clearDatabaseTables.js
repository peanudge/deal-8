import mysqlConnection from "./config/mysql.js";

mysqlConnection.connect(function (err) {
  if (err) throw err;
});

// drop interest product table;
const interest_prodcut_table_drop_query = `
    DROP TABLE interest_product;
`;

const interestProductTableDropResult = await mysqlConnection
  .promise()
  .query(interest_prodcut_table_drop_query);

// console.log(interestProductTableDropResult[0]);

// drop  product table;
const product_table_drop_query = `
    DROP TABLE product;
`;

const productTableDropResult = await mysqlConnection
  .promise()
  .query(product_table_drop_query);

//drop location table
const location_table_drop_qeury = `
    DROP TABLE location;
`;
const location_table_drop_qeury_result = await mysqlConnection
  .promise()
  .query(location_table_drop_qeury);

// drop account table;
const account_table_drop_query = `
    DROP TABLE account;
`;
const account_table_drop_query_result = await mysqlConnection
  .promise()
  .query(account_table_drop_query);

// drop category table;
const category_table_drop_query = `
    DROP TABLE category;
`;
const category_table_drop_query_result = await mysqlConnection
  .promise()
  .query(category_table_drop_query);

console.log("Complete Clear Tables");
process.exit(1);
