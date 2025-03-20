"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Header from "components/todo_reduce/Header";
import TodoList from "components/todo_reduce/TodoList";
import InputTodo from "components/todo_reduce/InputTodo";
import "./ui.css";

function reducer(state, action) {
  // console.log("Reducer ... :", state, action);
  let nextState;
  switch (action.type) {
    case "INIT_TODO":
      return action.data;
    case "CREATE_TODO": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE_TODO": {
      nextState = state.map((todo) =>
        todo.id === action.targetId
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      break;
    }
    case "DELETE_TODO": {
      nextState = state.filter((todo) => todo.id !== action.targetId);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todos", JSON.stringify(nextState));
  return nextState;
}

export default function TaskApp() {
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    if (localStorage.getItem("todos") !== null) {
      const localTodos = JSON.parse(localStorage.getItem("todos"));
      idRef.current = localTodos.length + 1;
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
