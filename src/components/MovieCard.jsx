import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <Link to={`/movie/${id}`} className="movie-card w-full p-2">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-400"
      />
      <div className="mt-2 relative group">
        <h3 className="text-sm md:text-base font-semibold truncate max-w-[180px] hover:scale-110 transition-transform duration-300">
          {title}
        </h3>
        {/* Tooltip for long titles */}
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
          {title}
        </span>
        <div className="flex flex-wrap items-center text-xs md:text-sm gap-1 mt-1 text-gray-400">
          <div className="flex items-center gap-1">
            <img
              src="/star.svg"
              alt="star icon"
              className="h-4 w-4 hover:scale-110 transition-transform duration-300"
            />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p>{original_language}</p>
          <span>•</span>
          <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    original_language: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
