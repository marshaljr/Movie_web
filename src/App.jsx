import React, { use, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "./hooks/Debounce.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("API Key:", import.meta.env.VITE_TMDB_API_KEY);

const fetchMovies = async (query) => {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&api_key=${API_KEY}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
  try {
    const { data } = await axios.get(endpoint);
    return data.results;
  } catch (error) {
    throw new Error(
      error.response?.data?.status_message || "Failed to fetch movies"
    );
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 1500);

  const {
    data: movies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["movies", debounceSearchTerm], // 🔹 Query key
    queryFn: () => fetchMovies(debounceSearchTerm), // 🔹 Query function
    enabled: !!debounceSearchTerm || debounceSearchTerm === "", // 🔹 When to fetch
  });

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
        <section>
          <h2 className="mt-[20px]">All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : (
            <ul className="grid grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
export default App;
