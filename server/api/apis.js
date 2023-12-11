const express = require("express");
const route = express.Router();
const fs = require("fs");
const rawData = fs.readFileSync("db.json");
const data = JSON.parse(rawData);
route.get("/apis/todolist", (req, res) => {
  res.status(200).json({
    message: "Lấy về thành công",
    todoList: data.todoList,
  });
});
route.post("/apis/todolist", (req, res) => {
  data.todoList.push(req.body);
  console.log(data.todoList);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json({
    message: "Thêm thành công",
    todoList: data.todoList,
  });
});
route.delete("/apis/todolist/:id", (req, res) => {
    console.log(req.params.id);
    if(req.params.id=="null"){
        data.todoList=[]
    }else{
        const newData=data.todoList.filter((item)=>item.id!=req.params.id);
        data.todoList=newData;
    }
    fs.writeFileSync("db.json",JSON.stringify(data));
    res.status(200).json({
        message:"Xóa thành công",
        todoList:data.todoList
    })
});
route.put("/apis/todolist/:id",(req,res)=>{
    const index = data.todoList.findIndex((item)=>item.id==req.params.id);
    data.todoList[index]=req.body;
    fs.writeFileSync("db.json",JSON.stringify(data));
    res.status(200).json({
        message:"Sừa thành công",
        todoList:data.todoList
    })

})
module.exports = route;
