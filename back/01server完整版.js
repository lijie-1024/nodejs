// f分析:这个文件是后台文件,运用nodejs操作sql语句查询了heros数据库内的数据并发送到端口5001,用户访问http://localhost:5001/getallhero时,显示数据.
const express = require("express");
const app = express();
// 导入mysql模块-->规定这样写,host可更改为127.0.0.1
const mysql = require("mysql");
// body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
const bodyparser = require("body-parser");
// 创建 application/x-www-form-urlencoded 解析
app.use(bodyparser.urlencoded({ extended: false }));
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql001"
});

// 只有有人请求/ 根路径地址就提示他请求api成功
app.get("/", (req, res) => {
  res.send("请求后台api接口成功");
});
// 对外暴露接口,当有人请求http://localhost:5001/getallhero时发送从后台查询的数据
app.get("/getallhero", (req, res) => {
  // sql查询语句
  const sql = "select * from heros";
  // err是状态,message是错误码,data是内容,status是状态码,result是查询参数
  conn.query(sql, (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message, data: null });
    res.send({ status: 200, msg: "success", data: result });
  });
});
// POST /login 获取 URL编码的请求体并操作数据
app.post("/addhero", (req, res) => {
  // 用户提交的数据req.body
  const hero = req.body;
  //   以下,给数据库中的ctime赋值(当前时间)
  // 获取当前的时间对象,字符串新方法padstart(长度,'添加的字')
  const dt = new Date();
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, "0");
  const d = dt
    .getDate()
    .toString()
    .padStart(2, "0");

  const hh = dt
    .getHours()
    .toString()
    .padStart(2, "0");
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const ss = dt
    .getSeconds()
    .toString()
    .padStart(2, "0");
  //   以正确格式拼接
  hero.ctime = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  // 操作插入sql数据
  const sql = "insert into heros set?";
  conn.query(sql, hero, (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message, data: null });
    res.send({ status: 200, msg: "success", data: result });
  });
});

// 对外暴露获取英雄信息
app.get("/gethero/:name", (req, res) => {
  const name = req.params.name;
  const sql = "select * from heros where name=?";
  conn.query(sql, name, (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message, data: null });
    res.send({ status: 200, msg: "success", data: result });
  });
});

// 根据id更改英雄信息的接口
app.post("/updatehero/:id", (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  // 使用bodtparser 中间件，湖片区用户提交过来数据库内的信息
  const newInfo = req.body;
  const sql = "update heros set ? where id=?";
  // query第二个参数是占位符，sql中？替代的具体数值
  conn.query(sql, [newInfo, id], (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message, data: null });
    res.send({ status: 200, msg: "success", data: result });
  });
});

// 根据id删除英雄信息的接口
app.get("/deletehero/:id", (req, res) => {
  const id = req.params.id;
  const sql = "update heros set isdel= 1 where id=?";
  conn.query(sql, id, (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message, data: null });
    res.send({ status: 200, msg: "success", data: result });
  });
});

// 让后端项目运行到5001端口,可以再浏览器中打开,也可以使用postman打开url看到结果
app.listen(5001);
