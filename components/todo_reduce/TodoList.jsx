import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    } else {
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  };
  const filteredTodos = getFilteredData();

  return (
    <div className="flex flex-col gap-2 justify-center">
      <h4 className="text-xl mt-8 font-bold">Todo List</h4>
      <input
        className="flex-1 border-b-2 border-b-blue-500 mb-5"
        placeholder="검색어를 입력 하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="flex flex-col gap-5">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
