"use client";

import { useReducer, useState } from "react";

const stylebtn = "border border-grey-700 px-2 py-1 rounded bg-black text-white";
const styleInput = "border border-grey-700 p-1 rounded ";

function AddTask({ onAddTask }) {
  const [text, setText] = useState("");
  return (
    <>
      <input
        className={styleInput}
        placeholder="Add todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={stylebtn}
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}

function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          className="w-[80%]"
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <div className="flex justify-center gap-2 w-36">
          <button className={stylebtn} onClick={() => setIsEditing(false)}>
            저장
          </button>
          <button className={stylebtn} onClick={() => onDelete(task.id)}>
            삭제
          </button>
        </div>
      </>
    );
  } else {
    taskContent = (
      <>
        <span className="w-[80%]"> {task.text}</span>
        <div className="flex justify-center gap-2 w-36">
          <button className={stylebtn} onClick={() => setIsEditing(true)}>
            수정
          </button>
          <button className={stylebtn} onClick={() => onDelete(task.id)}>
            삭제
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="flex gap-2 ">
      <input
        className="w-4"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
    </div>
  );
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 pl-10 lg:w-[50%] md:w-[80%] w-[90%]">
        <h1 className="text-2xl font-bold">Todo ( Reducer )</h1>
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Todo 1 text ", done: true },
  { id: 1, text: "Todo 2 text ", done: false },
  { id: 2, text: "Todo 3 text ", done: false },
  { id: 3, text: "Todo 4 text ", done: true },
  { id: 4, text: "Todo 5 text ", done: false },
];
