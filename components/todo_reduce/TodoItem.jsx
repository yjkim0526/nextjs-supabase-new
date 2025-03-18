import React from "react";
import "./TodoItem.css";

function TodoItem({
  id,
  completed,
  created_at,
  title,
  onUpdateTodo,
  onDeleteTodo,
}) {
  const onChangeCheckbox = () => {
    onUpdateTodo(id);
  };

  const onClickDelete = () => {
    onDeleteTodo(id);
  };

  return (
    <div className="TodoItem">
      <input
        id={Number(id)}
        type="checkbox"
        checked={completed}
        onChange={onChangeCheckbox}
      />
      <div
        className="content"
        style={
          completed === true ? { textDecorationLine: "line-through" } : null
        }
      >
        {title}
      </div>
      <div className="date">{new Date(created_at).toLocaleDateString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
}

export default TodoItem;
