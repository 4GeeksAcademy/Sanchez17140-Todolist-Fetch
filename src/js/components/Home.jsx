import React from "react";
import TodoList from "./TodoList"; 

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Todolist</h1>
      <TodoList />
    </div>
  );
};

export default Home;