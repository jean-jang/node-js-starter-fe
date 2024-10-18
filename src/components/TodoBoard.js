import TodoItem from "./TodoItem";
import React from "react";

const TodoBoard = ({ todoList }) => {
  // console.log(todoList);

  if (!todoList || todoList.length === 0) {
    return <h2>There is no Item to show</h2>;
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.map((item, index) => (
        <TodoItem key={index} item={item} />
      ))}
    </div>
  );
};

export default TodoBoard;
