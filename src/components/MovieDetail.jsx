import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchMovieDetail = async (id) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return data;
};

const fetchSimilarMovies = async (id) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );
  return data.results;
};

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id),
  });

  const {
    data: similarMovies,
    isLoading: loadingSimilar,
    error: errorSimilar,
  } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => fetchSimilarMovies(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="movie-detail w-full flex flex-col md:flex-col lg:flex-col p-4 md:p-10 gap-8">
      <div className="movie-card flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="opacity-60 w-full sm:w-[60%] md:w-1/3 h-auto object-contain rounded-lg"
        />
        <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-bold text-white">
            {movie.title}
          </h1>
          <p className="text-sm md:text-base text-white max-w-lg">
            {movie.overview}
          </p>
          <p className="text-white">Release Date: {movie.release_date}</p>
          <div className="flex items-center gap-2 text-white">
            <img
              src="/star.svg"
              alt="star icon"
              className="h-6 w-6 hover:scale-110 transition-transform duration-300"
            />
            <span>Rating: {movie.vote_average}</span>
          </div>
          <p className="text-white">Language: {movie.original_language}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition hover:scale-105 mt-2">
            Back to Home
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
          Similar Movies
        </h2>
        {loadingSimilar ? (
          <Spinner />
        ) : errorSimilar ? (
          <p className="text-red-500">{errorSimilar.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center sm:px-6 md:px-8 lg:px-14">
            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-full max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
