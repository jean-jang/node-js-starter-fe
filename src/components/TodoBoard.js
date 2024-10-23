import React from "react";
import TodoItem from "./TodoItem";
import { Stack } from "react-bootstrap";

const TodoBoard = ({ todoList, onComplete, onDelete }) => {
  if (!todoList || todoList.length === 0) {
    return (
      <div className="text-center text-muted my-4">
        <h6>Add your list...</h6>
      </div>
    );
  }

  return (
    <Stack gap={2}>
      {todoList.map((item, index) => (
        <TodoItem
          key={item._id}
          item={item}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};

export default TodoBoard;
