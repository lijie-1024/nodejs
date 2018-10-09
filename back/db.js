// 数据操作模块，负责连接对象
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql001"
});
module.exports = conn;
