"use client";

import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "components/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import SearchInput from "components/search-input";

export default function TodoPage() {
  const [searchInput, setSearchInput] = useState("");
  const [todoInput, setTodoInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos", searchInput],
    queryFn: () => getTodos({ searchInput }),
  });

  // useEffect(() => {
  //   todosQuery.refetch();
  // }, [searchInput]);

  const createTodoMutation = useMutation({
    mutationFn: () => createTodo({ title: todoInput, completed: false }),
    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <div className="w-full flex gap-10 justify-center">
        <h1 className="text-xl mt-2">TODO LIST</h1>
        {/* <Input
          label="Search TODO"
          placeholder="Search TODO"
          icon={<i className="fas fa-search" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        /> */}

        <SearchInput searchInput={searchInput} handleSearch={handleSearch} />
      </div>

      <div className="mt-14 flex items-center justify-between gap-4  w-full mb-10">
        <div className="relative w-full ml-2">
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="New Todo"
            className="w-full border border-gray-500 rounded p-2 "
          />
        </div>
        <div className="w-40">
          <Button
            onClick={() => createTodoMutation.mutate()}
            loading={createTodoMutation.isPending}
          >
            {createTodoMutation.isPending ? (
              <p>등록중</p>
            ) : (
              <p>
                <i className="fas fa-plus"></i> ADD TODO
              </p>
            )}
          </Button>
        </div>
      </div>
      <div className="container mb-20">
        {todosQuery.isPending && <p>Loding ... </p>}
        {todosQuery.data &&
          todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
}
