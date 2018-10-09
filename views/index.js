$(function() {
  function getHeroList() {
    $.ajax({
      type: "get",
      url: "http://localhost:5001/getallhero",
      success: function(res) {
        // console.log(res);
        var html = template("template", res);
        $("#tbody").html(html);
      }
    });
  }
  getHeroList();
  // 添加
  $("#add").click(() => {
    $("#addForm").modal("show");
  });
  $("#btnAdd").click(() => {
    $.ajax({
      type: "post",
      url: "http://localhost:5001/addhero",
      data: $("form").serialize(),
      success: function(res) {
        if (res.status == 200) {
          alert("添加成功");
        }
        getHeroList();
      }
    });
  });
  // 软删除
  $("#tbody").on("click", "#delBtn", function() {
    // var f1 = $(this).data("id");
    var id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
      type: "get",
      url: "http://localhost:5001/deletehero",
      data: { id },
      success: function(res) {
        alert("删除成功");
        getHeroList();
      }
    });
  });

  // 点击编辑按钮 渲染页面
  $("#tbody").on("click", "#updateBtn", function() {
    $("#updataTable").modal("show");
    var id = $(this).attr("data-id");
    // 根据id获取该英雄属性，渲染到页面表格中
    $.ajax({
      type: "get",
      url: "http://localhost:5001/gethero",
      data: { id },
      success: function(res) {
        // console.log(res);
        if (res.status == 200) {
          var str = template("updataTel", res);
          $("#updataForm").html(str);
        }
      }
    });
  });

  $("#updataForm").on("click", "#upAddBtn", function() {
    var id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
      type: "post",
      url: "http://localhost:5001/updatehero?id=" + id,
      data: $("#formUpda").serialize(),
      success: function(res) {
        console.log(res);
        if (res.status == 200) {
          location.reload();
        }
      }
    });
  });
});
