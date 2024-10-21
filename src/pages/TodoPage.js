import React, { useState, useEffect } from "react";
import api from "../utils/api";
import TodoBoard from "../components/TodoBoard";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
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

  const addTask = async () => {
    try {
      const response = await api.post("/task", {
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
      console.error("An error occurred", error);
    }
  };

  const completeTask = async (id, isCompleted) => {
    try {
      const response = await api.put(`/task/${id}`, {
        isCompleted: isCompleted,
      });
      if (response.status === 200) {
        console.log("Task status updated successfully.");
        getTodoList();
      } else {
        throw new Error("Failed to update task status.");
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
    navigate("/login");
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onComplete={completeTask}
        onDelete={deleteTask}
      />

      <Row className="logout-row">
        <Col xs={12}>
          <span onClick={handleLogout}>Logout</span>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoPage;
