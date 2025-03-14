import React from "react";

export default function SearchInput({ searchInput, handleSearch }) {
  return (
    <div className="relative ">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Inupt Search"
        className="w-full border border-gray-500 rounded p-2 "
      />
      <span className="absolute bottom-2 right-2 text-gray-600">
        <i className="fas fa-search"></i>
      </span>
    </div>
  );
}
