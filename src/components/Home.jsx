// src/pages/Home.jsx
import { useState } from "react";
import Search from "../components/Search.jsx";
import Spinner from "../components/Spinner.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { useDebounce } from "../hooks/Debounce.js";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchMovies = async (query) => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&api_key=${API_KEY}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 1500);

  const {
    data: movies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["movies", debounceSearchTerm],
    queryFn: () => fetchMovies(debounceSearchTerm),
    enabled: !!debounceSearchTerm || debounceSearchTerm === "",
  });

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy
            Without Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
        <section>
          <h2 className="mt-8 mb-4 text-xl md:text-2xl">All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center lg:gap-16">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[460px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
