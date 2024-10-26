import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';

const SearchResultPage = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();
  const handleGotoMovieDetailPage = (id) => {
    navigate(`/movie/${id}`)
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, [query, page, API_KEY]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Search Results for: "{query}"</h1>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="movie-item" onClick={() => handleGotoMovieDetailPage(movie?.id)}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#ccc' }}>No results found.</p>
        )}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default SearchResultPage;

