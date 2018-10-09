const express = require("express");
const router = express.Router();
const ctrl = require("./controller.js");
// 只有有人请求/ 根路径地址就提示他请求api成功
router.get("/", ctrl.testAPI);
// 对外暴露接口,当有人请求http://localhost:5001/getallhero时发送从后台查询的数据
router.get("/getallhero", ctrl.getallheroAPI);
// POST /login 获取 URL编码的请求体并操作数据
router.post("/addhero", ctrl.addheroAPI);
// 对外暴露获取英雄信息
router.get("/gethero", ctrl.getheroAPI);
// 根据id更改英雄信息的接口
router.post("/updatehero", ctrl.updateheroAPI);
// 根据id软删除英雄信息的接口
router.get("/deletehero", ctrl.deleteheroAPI);
module.exports = router;
