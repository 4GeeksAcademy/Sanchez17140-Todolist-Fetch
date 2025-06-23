import React, { useState, useEffect } from 'react';


const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");
 
const loadUser = async () => {

  const resp = await fetch("https://playground.4geeks.com/todo/users/Kevin")
 
  if (!resp.ok) {
    const resp = await fetch("https://playground.4geeks.com/todo/users/Kevin", {
      method: "post"
    })
    return
  }
  const data = await resp.json() 
  setTasks (data.todos) 
}
useEffect(()=>{loadUser()}, [])
const addTask = async (event) => {
  if (event.key === "Enter" && newTask.trim() !== "") {
      const newTaskObject = { label: newTask, is_done: false };


          const resp = await fetch("https://playground.4geeks.com/todo/todos/Kevin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newTaskObject),
          });

          const data = await resp.json();

          setTasks([...tasks, data]); 
          setNewTask(""); 
  }
};

  const deleteTask = async (taskId) => {

    try {
        await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => taskId !== task.id )); 
        console.log(`Task with ID ${taskId} deleted`);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
  return (
    <div className="todo-container">
      <h1 className="title">Todos</h1>
      <input
        type="text"
        placeholder="Add a task and click enter"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={addTask}
        className="task-input"
      />
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="no-tasks">{tasks.length} Tasks</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="task-item">
              {task.label}
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;