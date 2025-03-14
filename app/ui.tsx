"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import Image from "next/image";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-10">
      <h1 className="mt-8 text-2xl font-bold">
        Next.js + Typescript + Tailwindcss + Supabase
      </h1>
      <h2 className="text-xl ">
        Todo 작성/수정/삭제, Dropbox 파일 업로드/삭제
      </h2>
      <Image
        alt="main image"
        className="rounded-2xl shadow-md"
        src="/images/main_top_img2.jpg"
        width="680"
        height="400"
      />
    </div>
  );
}
