import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

function App() {
  const [todoList, setTodolist] = useState([]);

  const getTodoList = async () => {
    try {
      const response = await api.get("/api/task");
      console.log("Getting todolists!", response);
      setTodolist(response.data.tasks);
    } catch (error) {
      console.error("Error fetching todo list:", error);
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
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add">추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} />
    </Container>
  );
}

export default App;
