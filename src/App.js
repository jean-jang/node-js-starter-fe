import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

function App() {
  const [todoList, setTodolist] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTodoList = async () => {
    try {
      const response = await api.get("/api/task");
      console.log("Getting todolists!", response);
      setTodolist(response.data.tasks.reverse());
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/api/task", {
        task: todoValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        console.log("Task added successfully.");
        setTodoValue("");
        getTodoList();
      } else {
        throw new Error("Failed to add task.");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const completeTask = async (id, isCompleted) => {
    try {
      const response = await api.put(`/api/task/${id}`, {
        isCompleted: isCompleted,
      });
      if (response.status === 200) {
        console.log("Task status updated successfully.");
        getTodoList(); // 목록 갱신
      } else {
        throw new Error("Failed to update task status.");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/api/task/${id}`);
      if (response.status === 200) {
        console.log("Task deleted successfully.");
        getTodoList(); // 목록 갱신
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Container>
      <h1 className="title">Todo List</h1>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="Add your task here..."
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            ADD
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onComplete={completeTask}
        onDelete={deleteTask}
      />
    </Container>
  );
}

export default App;
