import React from 'react';
import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;

