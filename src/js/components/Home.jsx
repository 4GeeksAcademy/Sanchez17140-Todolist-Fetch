import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const loadUser = async () => {

  const resp = await fetch("https://playground.4geeks.com/todo/users/Kevin")
 
  if (!resp.ok) {
    const resp = await fetch("https://playground.4geeks.com/todo/users/Kevin", {
      method: "post"
    })
    return
  }
  const data = await resp.json() 
  setTodos (data.todos) 
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

          setTodos([...todos, data]); 
          setNewTask(""); 
  }
};

  const deleteTask = async (taskId) => {

    try {
        await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
        });

        setTodos(todos.filter((task) => taskId !== task.id )); 
        console.log(`Task with ID ${taskId} deleted`);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                setTodos([...todos, inputValue.trim()]);
                setInputValue("");
              }
            }}
            placeholder="Add a task and click enter"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <i
              class="fa-solid fa-xmark"
              style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
              onClick={() =>
                setTodos(todos.filter((_, currentIndex) => index !== currentIndex))
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;
