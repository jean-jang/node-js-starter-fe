import React from "react";
import { Card, Stack, Button } from "react-bootstrap";

const TodoItem = ({ item, onComplete, onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <Stack gap={1} className="flex-grow-1">
            <span
              className={
                item.isCompleted
                  ? "text-muted text-decoration-line-through"
                  : ""
              }
            >
              {item.task}
            </span>
            <small className="text-muted">
              {item.author ? item.author.username : "NotUser"}
            </small>
          </Stack>

          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(item._id)}
            >
              삭제
            </Button>
            <Button
              variant={
                item.isCompleted ? "outline-secondary" : "outline-primary"
              }
              size="sm"
              onClick={() => onComplete(item._id, !item.isCompleted)}
            >
              {item.isCompleted ? "복구" : "완료"}
            </Button>
          </Stack>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
