import PropTypes from "prop-types";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container flex justify-center">
      <div className="flex flex-row gap-4 py-10 w-[61%]">
        <img src="search.svg" alt="search" />
        <input
          className="w-full px-4 py-2 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:border-blue-400 hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 transition-all duration-400 outline-none"
          type="text"
          placeholder="Search through thousand of movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Search;
