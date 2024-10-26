import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return <p>No movies available.</p>;
  }
 
  return (
    <div className="movie-list">
      {movies.map((movie) => (
       <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
    
  );
};

export default MovieList;
