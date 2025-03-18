"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Header from "components/todo_reduce/Header";
import TodoList from "components/todo_reduce/TodoList";
import InputTodo from "components/todo_reduce/InputTodo";
import "./ui.css";

function reducer(state, action) {
  console.log("Reducer ... :", state, action);
  switch (action.type) {
    case "INIT_TODO":
      return action.data;
    case "CREATE_TODO":
      state = [action.data, ...state];
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    case "UPDATE_TODO":
      state = state.map((todo) =>
        todo.id === action.targetId
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    case "DELETE_TODO":
      state = state.filter((todo) => todo.id !== action.targetId);
      localStorage.setItem("todos", JSON.stringify(state));
      return state;
    default:
      return state;
  }
}

export default function TaskApp() {
  const [initData, setInitData] = useState([]);
  const [todos, dispatch] = useReducer(reducer, initData);
  const idRef = useRef(0);

  useEffect(() => {
    if (localStorage.getItem("todos") !== null) {
      console.log("length: " + localStorage.getItem("todos").length);
      idRef.current = localStorage.getItem("todos").length;
      console.log(">> localStorage data exists");
      const localTodos = JSON.parse(localStorage.getItem("todos"));
      setInitData(localTodos);
      dispatch({
        type: "INIT_TODO",
        data: localTodos,
      });
    }
  }, []);

  const onCreateTodo = (content) => {
    dispatch({
      type: "CREATE_TODO",
      data: {
        completed: false,
        created_at: new Date().getTime(),
        id: todos.length + 1, // idRef.current++,
        title: content,
      },
    });
  };

  const onUpdateTodo = (todoId) => {
    console.log(">>> todoId : ", todoId);
    dispatch({
      type: "UPDATE_TODO",
      targetId: todoId,
    });
  };

  const onDeleteTodo = (todoId) => {
    console.log(">>> todoId : ", todoId);
    dispatch({
      type: "DELETE_TODO",
      targetId: todoId,
    });
  };

  return (
    <div className="App">
      <Header />
      <InputTodo onCreateTodo={onCreateTodo} />
      <TodoList
        todos={todos}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
      {/* {JSON.stringify(initData)} */}
    </div>
  );
}
