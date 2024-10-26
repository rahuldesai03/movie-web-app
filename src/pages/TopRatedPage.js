import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchMovies();
  }, [page, API_KEY]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>Top Rated Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'path/to/default-image.jpg'}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default TopRatedPage;

