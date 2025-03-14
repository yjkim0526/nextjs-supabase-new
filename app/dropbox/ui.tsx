"use client";

import { useState } from "react";
import DropboxFile from "components/dropbox-file";
import DropboxImageList from "components/dropbox-image-list";
import SearchInput from "components/search-input";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");
  const [isError, setIsError] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="mt-24 container w-full mx-auto flex flex-col gap-5 mb-20">
      {/* 로고 및 타이틀 */}
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 50 50"
        >
          <path d="M 15.59375 2 L 1 11.40625 L 11 19 L 25 10.09375 Z M 25 10.09375 L 39.6875 18.59375 L 49 11 L 34.8125 2 Z M 39.6875 18.59375 L 25 27.8125 L 34.59375 35.09375 L 49 26.5 Z M 25 27.8125 L 11 19 L 1 26.5 L 15.59375 35.09375 Z M 25 30.3125 L 16.8125 36.6875 C 16.460938 36.957031 16.035156 37.09375 15.59375 37.09375 C 15.238281 37.09375 14.902344 36.992188 14.59375 36.8125 L 9 33.53125 L 9 39.09375 C 9 39.429688 9.15625 39.75 9.4375 39.9375 L 24.4375 49.84375 C 24.605469 49.953125 24.808594 50 25 50 C 25.191406 50 25.398438 49.953125 25.5625 49.84375 L 40.5625 40.03125 C 40.84375 39.847656 41 39.527344 41 39.1875 L 41 33.59375 L 35.625 36.8125 C 35.316406 37 34.953125 37.09375 34.59375 37.09375 C 34.15625 37.09375 33.722656 36.949219 33.375 36.6875 Z"></path>
        </svg>
        <div className="text-xl font-bold ml-4 mt-1">Drop Box</div>
      </div>
      {/* 검색 input */}
      <SearchInput searchInput={searchInput} handleSearch={handleSearch} />
      {/* drop box */}
      <DropboxFile isError={isError} setIsError={setIsError} />

      {/* image */}
      <DropboxImageList searchInput={searchInput} />
    </div>
  );
}
