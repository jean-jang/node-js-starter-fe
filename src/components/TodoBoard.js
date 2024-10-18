import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, onComplete, onDelete }) => {
  // console.log(todoList);

  if (!todoList || todoList.length === 0) {
    return <h2>There is no Item to show</h2>;
  }

  return (
    <div>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoBoard;
