import React, { useState, useEffect } from "react";
import api from "../utils/api";
import TodoBoard from "../components/TodoBoard";
import { Stack, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TodoPage = ({ setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const getTodoList = async () => {
    try {
      const response = await api.get("/task");
      console.log("Getting todolists!", response);
      setTodoList(response.data.tasks.reverse());
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!todoValue.trim()) return;

    try {
      const response = await api.post("/task", {
        task: todoValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        setTodoValue("");
        getTodoList();
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const completeTask = async (id, isCompleted) => {
    try {
      const response = await api.put(`/task/${id}`, {
        isCompleted: isCompleted,
      });
      if (response.status === 200) {
        getTodoList();
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/task/${id}`);
      if (response.status === 200) {
        console.log("Task deleted successfully.");
        getTodoList();
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="display-center">
      <div className="w-100">
        <Stack gap={4}>
          <h1>Todo List</h1>

          <Form onSubmit={addTask}>
            <Stack direction="horizontal" gap={2}>
              <Form.Control
                type="text"
                placeholder="할일을 입력하세요"
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
              />
              <Button type="submit">+</Button>
            </Stack>
          </Form>

          <TodoBoard
            todoList={todoList}
            onComplete={completeTask}
            onDelete={deleteTask}
          />

          <div className="text-end">
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default TodoPage;
