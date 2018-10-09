// 业务处理api模块
const conn = require("./db.js");
module.exports = {
  testAPI: (req, res) => {
    res.send("请求后台api接口成功");
  },
  getallheroAPI: (req, res) => {
    // sql查询语句
    const sql = "select * from heros";
    // err是状态,message是错误码,data是内容,status是状态码,result是查询参数
    conn.query(sql, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null });
      res.send({ status: 200, msg: "success", data: result });
    });
  },
  addheroAPI: (req, res) => {
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
  },
  getheroAPI: (req, res) => {
    const id = req.query.id;
    const sql = "select * from heros where id=?";
    conn.query(sql, id, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null });
      res.send({ status: 200, msg: "success", data: result });
    });
  },
  updateheroAPI: (req, res) => {
    const id = req.query.id;
    console.log(id);
    // 使用bodtparser 中间件，湖片区用户提交过来数据库内的信息
    const newInfo = req.body;
    // console.log(newInfo);
    const sql = "update heros set ? where id=?";
    // query第二个参数是占位符，sql中？替代的具体数值
    conn.query(sql, [newInfo, id], (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null });
      res.send({ status: 200, msg: "success", data: result });
    });
  },
  deleteheroAPI: (req, res) => {
    const id = req.query.id;
    const sql = "update heros set isdel= 1 where id=?";
    conn.query(sql, id, (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message, data: null });
      res.send({ status: 200, msg: "success", data: result });
    });
  }
};
