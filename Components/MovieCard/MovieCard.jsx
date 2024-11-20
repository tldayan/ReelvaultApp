import React, { useState } from 'react';
import defaultPoster from "../../assets/no_image.jpg";
import { StyledMovieLink } from './MovieCard.style';
import { MovieNameActions } from '../store/MovieNameSlice';
import EntityCardComponent from '../HOC/EntityCardComponent';
import { useDispatch } from 'react-redux';
import starIcon from '../../assets/star-solid.svg';

const MovieCard = ({ eachMovie, imageLoaded, handlePosterLoaded }) => {
  const dispatch = useDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false); 

  function handleMovieName(movieName) {
    dispatch(MovieNameActions.setMovieName(movieName));
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true); 
    handlePosterLoaded(); 
  };

  return (
    <StyledMovieLink
      to={`/movies/${eachMovie.id}`}
      onClick={() => handleMovieName(eachMovie.title)}
      key={eachMovie.id}
    >
      {imageLoaded ? (
        <div className="movie_poster_container">
          {isImageLoaded && <div className="hd">HD</div>}
          <img
            className="movie_poster"
            src={
              eachMovie.poster_path === null
                ? defaultPoster
                : `https://image.tmdb.org/t/p/original${eachMovie.poster_path}`
            }
            alt="imagePoster"
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </div>
      ) : (
        <div className="movie_poster_skeleton" />
      )}
      {isImageLoaded && <h3 className="movie_name">{eachMovie.title}</h3>}
      {isImageLoaded && (
        <div className="entity_info_container">
          <div className="movie_date">{eachMovie.release_date?.slice(0, 4)}</div>
          <div className="vote_container">
            <img className="star" src={starIcon} alt="star_icon" />
            <div className={"movie_vote"}>
              {eachMovie.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
      )}
    </StyledMovieLink>
  );
};

export default React.memo(EntityCardComponent(MovieCard));
