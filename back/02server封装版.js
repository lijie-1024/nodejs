// f分析:这个文件是后台文件,运用nodejs操作sql语句查询了heros数据库内的数据并发送到端口5001,用户访问http://localhost:5001/getallhero时,显示数据.
const express = require("express");
const router = require("./router.js");
const app = express();
// body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
const bodyparser = require("body-parser");
// 创建 application/x-www-form-urlencoded 解析
app.use(bodyparser.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());
app.use(router);
// 让后端项目运行到5001端口,可以再浏览器中打开,也可以使用postman打开url看到结果
app.listen(5001);
