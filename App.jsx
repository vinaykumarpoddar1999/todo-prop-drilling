import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
function TaskLists({
  taskList,
  setTaskList,
  handleUpdateTask,
  handleTaskCompletion
}) {
  const handleDeleteTask = (id) => {
    const newTaskList = taskList.filter((task) => {
      return task.id !== id;
    });
    setTaskList(newTaskList);
  };

  return (
    <div className="taskAll">
      {taskList.length > 0 ? (
        taskList.map((task, index) => (
          <div className="task">
          <div className="action">
          <div> <input checked={task.completed} onChange={()=>handleTaskCompletion(task.id)} className="complete" type="checkbox" /></div>
            <div className={`${task.completed? "linecut":""}`} key={task.id}>{task.title}</div>
            </div>
            <div className="action">
              <div className="delete" onClick={() => handleDeleteTask(task.id)}>
                <MdOutlineDelete />
              </div>
              <div
                className="edit"
                onClick={() => handleUpdateTask(task.id, task.title)}
              >
                <FaEdit />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Task Added </div>
      )}
    </div>
  );
}

function App() {
  const [activity, setaActivity] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentUpdateId, setCurrentUpdate] = useState(null)
  const handleAddTask = () => {
    if (activity == "") {
      return alert("Please Enter Task To Add It");
    }

    const singleActivity = {
      id: uuidv4(),
      title: activity,
      completed: false,
    };
    setTaskList([...taskList, singleActivity]);
    setaActivity("");
  };
  const handleUpdateTask = (id, title) => {
    setUpdate(true);
    setaActivity(title);
    setCurrentUpdate(id)
  };

  const handleUpdate =()=>{
    const updatedTaskList = taskList.map(
      (task) => {
        if (task.id == currentUpdateId) {
          const act = { ...task, title: activity };
          return act;
        } else {
          return task;
        }
      }
      // ( task.id == id ? {...task, title:activity}: task)
    );
    console.log(updatedTaskList);

    setTaskList(updatedTaskList);
    setUpdate(false);
    setaActivity("")
    setCurrentUpdate(null)
  }
  
  const handleTaskCompletion = (id)=>{
    const updatedTaskList = taskList.map(
      (task) => {
        if (task.id == id) {
          const completed = !task.completed
          const act = { ...task, completed:completed };
          return act;
        } else {
          return task;
        }
      }
      
    );
    setTaskList(updatedTaskList);
  }
  const handleRemoveAll = ()=>{
    setTaskList([])
  }
  const handleDeleteSelectedTask = ()=>{
    const newTaskList = taskList.filter((task) => {
      return task.completed !== true;
    });
    setTaskList(newTaskList);
  }
  return (
    <>
      <div>
        <h1>Todo App</h1>
        <input
          className="activityInput"
          type="text"
          value={activity}
          onChange={(e) => setaActivity(e.target.value)}
        />
      </div>
      <div>
        {!update ? (
          <button className="addBtn" onClick={() => handleAddTask(activity)}>
            Add
          </button>
        ) : (
          <button className="updateBtn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <TaskLists
        taskList={taskList}
        setTaskList={setTaskList}
        setUpdate={setUpdate}
        setaActivity={setaActivity}
        activity={activity}
        handleUpdateTask={handleUpdateTask}
        handleTaskCompletion={handleTaskCompletion}
      />

{taskList.length>0 && (<button className="removeallBtn" onClick={handleRemoveAll}>
            Remove All Task
          </button>)}
          {taskList.length>0 && (taskList.some((task)=>(task.completed===true))) &&  (<button className="removeallBtn" onClick={handleDeleteSelectedTask}>
            Remove Selected Task
          </button>)}
    </>
  );
}



export default App;
