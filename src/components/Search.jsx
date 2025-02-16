import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container flex justify-center">
      <div className="flex flex-row gap-4 py-10 w-[52%]">
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousand of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Search;
