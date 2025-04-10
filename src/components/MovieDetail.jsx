import React from "react";
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
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", id],
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error:{error.message}</p>;

  return (
    <>
      <div className="movie-detail w-full flex flex-row m-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          className="opacity-60 w-full h-[600px] object-contain"
        />
        <div className="flex flex-col justify-center items-center p-10 gap-10">
          <h1 className="text-white">{movies.title}</h1>
          <p className="text-white pr-10">{movies.overview}</p>
          <p className="text-white flex flex-col justify-center items-center">
            Release Date: {movies.release_date}
          </p>
          <p className="text-white flex flex-col justify-center items-center">
            <img src="/star.svg" alt="star icon" className="h-6 w-6" />
            Rating: {movies.vote_average}
          </p>
          <p className="text-white flex flex-col justify-center items-center">
            Language: {movies.original_language}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white p-2 rounded ">
            Back to Home
          </button>
        </div>
      </div>
      <div>
        <h2 className="mt-[40px] ml-[6rem] ">Similar movies</h2>
        {loadingSimilar ? (
          <Spinner />
        ) : errorSimilar ? (
          <p className="text-red-500">{errorSimilar.message}</p>
        ) : (
          <div className="grid grid-cols-4 gap-4 m-10">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
