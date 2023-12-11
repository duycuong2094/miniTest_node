import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";
import { MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
function TodoList() {
  const [value, setValue] = useState({
  });
  const [status,setStatus]=useState(false);
  const [listTodo,setListodo]=useState([]);
  const [updata,setUpdate]=useState(-1);
  const getApi=async()=>{
      const response = await axios.get("http://localhost:6007/apis/todolist");
      setListodo(response.data.todoList)
  }
  useEffect(()=>{
  getApi()
  },[status])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(value.todo==""){
      return
    }
    if(updata!=-1){
      const update=await axios.put(`http://localhost:6007/apis/todolist/${listTodo[updata].id}`,value);
      setUpdate(-1)
    }else{
      const res= await axios.post("http://localhost:6007/apis/todolist",value);
    }
    setStatus(!status);
    setValue({todo:"",id:""})
  }
  const handleDelete=async(id)=>{
    const res = await axios.delete(`http://localhost:6007/apis/todolist/${id}`)
    setStatus(!status);
  }
  const handleUpdate=(i)=>{
    setUpdate(i);
    setValue({todo:listTodo[i].todo,id:listTodo[i].id})
  }
  const resetTodo =async ()=>{
    const res = await axios.delete(`http://localhost:6007/apis/todolist/${null}`)
      setStatus(!status)
  }
    return (
    <div className="todo">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <MDBInput
          value={value.todo}
          onChange={(e) => setValue({id:uuidv4(),todo:e.target.value})}
          label="new to do"
          id="controlledValue"
          type="text"
        />{" "}
        <MDBBtn>
          <FaPlus type="submit" />
        </MDBBtn>
      </form>
      <table>
        <thead>
          <th>Todo</th>
          <th>Hành Động</th>
        </thead>
        <tbody>
         {listTodo?.map((item,i)=>(
          <tr key={i}>
            <td>{item.todo}</td>
            <td><button   color='danger' onClick={()=>handleDelete(item.id)}>Xóa</button> <button onClick={()=>handleUpdate(i)}>Sửa</button></td>
          </tr>
         ))}
        </tbody>
      </table>
      <div>Bạn có {listTodo.length} todo <button onClick={resetTodo}>Reset Todo</button></div>
    </div>
  );
}

export default TodoList;
