import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onComplete, onDelete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isCompleted ? "completed" : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>{item.author ? item.author.username : "NotUser"}</div>

          <div className="button-content">
            <button
              className="button-delete"
              onClick={() => onDelete(item._id)}
            >
              삭제
            </button>
            <button
              className="button-complete"
              onClick={() => onComplete(item._id, !item.isCompleted)}
            >
              {item.isCompleted ? "복구" : "완료"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
