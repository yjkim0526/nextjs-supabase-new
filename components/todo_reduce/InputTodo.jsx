import { useState, useRef } from "react";

function InputTodo({ onCreateTodo }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  const onSubmit = () => {
    if (title === "") {
      inputRef.current.focus();
      return;
    }
    onCreateTodo(title);
    setTitle("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="border border-blue-400 p-2 rounded flex-1"
        ref={inputRef}
        placeholder="새로운 Todo ..."
        value={title}
        onKeyDown={onKeyDown}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-blue-400 text-white py-2  px-4 rounded"
        onClick={onSubmit}
      >
        추가
      </button>
    </div>
  );
}

export default InputTodo;
