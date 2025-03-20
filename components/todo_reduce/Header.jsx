import React from "react";

function Header() {
  return (
    <div className="text-xl flex flex-col gap-5">
      <h3>오늘은📆</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

export default Header;
