import React from 'react';
import defaultPoster from "../../assets/no_image.jpg";
import { StyledMovieLink } from './MovieCard.style';
import { MovieNameActions } from '../store/MovieNameSlice'
import EntityCardComponent from '../HOC/EntityCardComponent'
import { useDispatch } from 'react-redux';

const MovieCard = ({ eachMovie, imageLoaded, posterLoaded, handlePosterLoaded}) => {
  const dispatch = useDispatch()

  function handleMovieName(movieName) {
    dispatch(MovieNameActions.setMovieName(movieName))
  }


  return (
    <StyledMovieLink to={`/movies/${eachMovie.id}`} onClick={() => handleMovieName(eachMovie.title)} key={eachMovie.id}>
      <div className="movie_poster_container">
      {posterLoaded && (
          <>
            <div className="movie_language">{eachMovie.original_language.toUpperCase()}</div>
            <div className="movie_date">{eachMovie.release_date.slice(0, 4)}</div>
            <div className={"movie_vote " + (eachMovie.vote_average > 7 ? "green" : eachMovie.vote_average < 5 ? "red" : "orange")}>
              {eachMovie.vote_average.toFixed(1)}
            </div>
          </>
        )}
        {imageLoaded ? (
          <img
            className="movie_poster"
            src={eachMovie.poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`}
            alt="imagePoster"
            loading='lazy'
            onLoad={handlePosterLoaded}
          />
        ) : (
          <div className="movie_poster_skeleton" style={{ width: '154px', height: '231px' }} />
        )}
      </div>
      {posterLoaded && <h3 className='movie_name'>{eachMovie.title.length > 20 ? `${eachMovie.title.slice(0, 20)}...` : eachMovie.title}</h3>}
    </StyledMovieLink>
  );
}


export default React.memo(EntityCardComponent(MovieCard))