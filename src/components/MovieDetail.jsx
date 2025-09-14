<<<<<<< HEAD
import React from "react";
=======
>>>>>>> 1931de0 (Update grid for responsive sizing)
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
<<<<<<< HEAD
=======

>>>>>>> 1931de0 (Update grid for responsive sizing)
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
<<<<<<< HEAD
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
=======
      <div className="movie-card w-full flex flex-col items-center justify-center sm:flex-row lg:justify-around  p-4 md:p-10 gap-4 md:gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          className="opacity-60 w-full xs:w-[50%] md:w-1/3 h-auto object-contain rounded-lg"
        />
        <div className="flex flex-col items-center justify-center sm:justify-center sm:items-center md:items-center md:justify:center lg:items-center lg:justify-center gap-6">
          <h1 className="text-xl md:text-3xl font-bold text-white">
            {movies.title}
          </h1>
          <p className="text-sm px-10 md:px-1 md:text-base lg:max-w-[50rem] text-white letter-spacing-1px">
            {movies.overview}
          </p>
          <p className="text-white mt-8">Release Date: {movies.release_date}</p>
          <div className="flex items-center gap-2 text-white">
            <img
              src="/star.svg"
              alt="star icon"
              className="h-6 w-6 hover:scale-110 transition-transform duration-300"
            />
            <span>Rating: {movies.vote_average}</span>
          </div>
          <p className="text-white">Language: {movies.original_language}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition hover:scale-105 hover:cursor-pointer">
>>>>>>> 1931de0 (Update grid for responsive sizing)
            Back to Home
          </button>
        </div>
      </div>
<<<<<<< HEAD
      <div>
        <h2 className="mt-[40px] ml-[6rem] ">Similar movies</h2>
=======

      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center text-center px-20 py-10">
          Similar Movies
        </h2>

>>>>>>> 1931de0 (Update grid for responsive sizing)
        {loadingSimilar ? (
          <Spinner />
        ) : errorSimilar ? (
          <p className="text-red-500">{errorSimilar.message}</p>
        ) : (
<<<<<<< HEAD
          <div className="grid grid-cols-4 gap-4 m-10">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center md:px-8 md:mx-8 md:gap-8 lg:mx-14 lg:px-14">
            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-full max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">
                <MovieCard movie={movie} />
              </div>
>>>>>>> 1931de0 (Update grid for responsive sizing)
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
