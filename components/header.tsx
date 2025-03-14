import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <div className="fixed top-0 right-0 left-0 h-16 bg-black p-4 text-white rounded flex justify-between z-10">
        <div className="ml-10">
          <Link href="/">Next.JS</Link>
        </div>
        <div className="flex gap-4 mr-10">
          <Link href="/">Home</Link>
          <Link href="/todolist">Todo</Link>
          <Link href="/dropbox">Dropbox</Link>
        </div>
      </div>
    </header>
  );
}
