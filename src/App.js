import { useState, useEffect } from "react";
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
      setTodolist(response.data.tasks);
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

      <TodoBoard todoList={todoList} />
    </Container>
  );
}

export default App;
