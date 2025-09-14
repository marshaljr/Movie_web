<<<<<<< HEAD
import React from "react";
=======
import PropTypes from "prop-types";
>>>>>>> 1931de0 (Update grid for responsive sizing)

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container flex justify-center">
<<<<<<< HEAD
      <div className="flex flex-row gap-4 py-10 w-[52%]">
        <img src="search.svg" alt="search" />
        <input
=======
      <div className="flex flex-row gap-4 py-10 w-[61%]">
        <img src="search.svg" alt="search" />
        <input
          className="w-full px-4 py-2 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:border-blue-400 hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 transition-all duration-400 outline-none"
>>>>>>> 1931de0 (Update grid for responsive sizing)
          type="text"
          placeholder="Search through thousand of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

>>>>>>> 1931de0 (Update grid for responsive sizing)
export default Search;
