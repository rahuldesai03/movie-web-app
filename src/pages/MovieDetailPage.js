import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  console.log('cast', cast);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log('id', id)
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        console.log('response', response)
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();

    const fetchCastDetails = async () => {
      console.log('id', id)
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-U`);
        console.log('response', response)
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [id, API_KEY]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {movie ? (
        <>

          <div className="movie-card">
            <div className="movie-container">
              <div className="movie-details">
                <div className="movie-container1">
                  <div className="movie-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      height={300}
                      width={175}
                    />
                  </div>
                  <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p style={{ color: 'lightblue', fontSize: '22px' }}>
                      <strong>Rating:</strong> {movie.vote_average} / 10
                    </p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                  </div>
                </div>
                <div>
                  <h2>Overview</h2>
                  <p style={{ fontSize: '20px', letterSpacing: 0.7 }}>{movie.overview}</p>
                </div>
              </div>

              <div className="movie-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </div>
          </div>



          <div className="cast-grid">
            {cast?.map((member, index) => (
              <div key={index} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className="cast-image"
                />
                <div className="cast-details">
                  <h4>{member.name}</h4>
                  <p>{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No details available for this movie.</div>
      )}
    </div>
  );
};

export default MovieDetailPage;
