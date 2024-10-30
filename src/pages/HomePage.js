import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleGotoMovieDetailPage = (id) => {
    navigate(`/movie/${id}`);
  };
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    // Fetch popular movies here
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, [page, API_KEY]);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#ffffff" }}>Popular Movies</h1>
      <div className="movie-grid">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleGotoMovieDetailPage(movie?.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default HomePage;
