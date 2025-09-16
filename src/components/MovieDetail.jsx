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
const fetchMovieVideos = async (id) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
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
  const {
    data: videos,
    isLoading: loadingVideos,
    error: errorVideos,
  } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => fetchMovieVideos(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="movie-detail w-full flex flex-col md:flex-col lg:flex-col p-4 md:p-10 gap-8 justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="opacity-60 w-2/3 sm:w-1/3 h-auto object-contain rounded-lg mx-auto hover:scale-105
            transition-transform
            duration-400"
        />
        <div className="flex flex-col gap-4 md:gap-6 items-center justify-center text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white">
            {movie.title}
          </h1>
          <p className="text-sm md:text-base text-white max-w-lg px-8">
            {movie.overview}
          </p>
          <p className="text-white">Release Date: {movie.release_date}</p>
          <div className="flex items-center gap-2 text-white">
            <img
              src="/star.svg"
              alt="star icon"
              className="h-6 w-6 hover:scale-120 transition-transform duration-300"
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

      <div className="mt-10 w-full flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
          Trailer
        </h2>
        {loadingVideos ? (
          <Spinner />
        ) : errorVideos ? (
          <p className="text-red-500">{errorVideos.message}</p>
        ) : videos?.length > 0 ? (
          <iframe
            width="860"
            height="415"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg max-w-full"></iframe>
        ) : (
          <p className="text-white">No trailer available</p>
        )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-4 justify-items-center">
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
