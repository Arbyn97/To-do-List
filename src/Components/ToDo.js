import { useState,useEffect } from "react";
import {BsTrash3} from "react-icons/bs";
function ToDo() {
    const [task,setTask]=useState('');
    const [taskList,setTaskList]=useState([]);
    var [checkedDone,setCheckedDone]=useState({});
    const addTask=(e)=>{
        e.preventDefault();
        if (task.trim() === '') return;  // جلوگیری از اضافه کردن تسک خالی
        setTaskList([...taskList,{ id: Date.now(), text: task }])
        setTask('');
        //  localStorage.setItem("tasks",JSON.stringify(taskList));
    }
     useEffect(() => {
 const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log("storedTasks:", storedTasks);
  try {
    if (storedTasks) {
    
      setTaskList(storedTasks);
    }
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    
  }
  }, []);
    useEffect(() => {
       if (taskList.length > 0) {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  }, [taskList]);
  const changestyle=(index)=>{
    
    setCheckedDone(prev => ({
      ...prev,
      [index]: !prev[index],  // برعکس کردن وضعیت تیک
    }));
  
  }
  const delettask=(id)=>{
    const deletedItem=taskList.filter(task=>task.id !==id);
    setTaskList(deletedItem);

  }
    return ( 

        <>
        <div className="Add">
        <input type="text" placeholder="type something...." onChange={(e)=>setTask(e.target.value)} value={task} />
        <button onClick={(e)=>addTask(e)}>+</button>
        </div>
        <div className="todolist">
        {taskList.map((task)=>{return (<div key={task.id} className="task">
          <input type="checkbox"  onChange={ ()=>changestyle(task.id)}/> <p key={task.id} style={{ textDecoration: checkedDone[task.id]  ? 'line-through' : 'none' }}>
            {task.text} <BsTrash3 color="red" className="trash" onClick={()=>delettask(task.id )} /></p> 
             </div>)})}
            <div>
                
            </div>
        </div>
        </>
     );
}

export default ToDo;