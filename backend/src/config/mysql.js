import mysql2 from "mysql2";
const mysqlConnection = mysql2.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "deal",
  password: process.env.DB_PASSWORD || "imdealpassword",
  database: process.env.DB_DBNAME || "deal8",
});

export default mysqlConnection;
