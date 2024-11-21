import React, { useState } from 'react';
import defaultPoster from "../../assets/no_image.jpg";
import { StyledShowLink } from './ShowCard.styles';
import { useDispatch } from 'react-redux';
import { ShowNameActions } from '../store/ShowNameSlice';
import EntityCardComponent from '../HOC/EntityCardComponent';
import starIcon from '../../assets/star-solid.svg';

const ShowCard = ({ eachShow, imageLoaded, handlePosterLoaded }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const dispatch = useDispatch();

  function handleShowName(showName) {
    dispatch(ShowNameActions.setShowName(showName));
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true); 
    handlePosterLoaded();
  };

  return (
    <StyledShowLink
      to={`tvshows/${eachShow.id}/1/1`}
      onClick={() => handleShowName(eachShow.name)}
      key={eachShow.id}
    >
      {imageLoaded ? (
        <div className="movie_poster_container">
          {isImageLoaded && <div className="hd">HD</div>}
          <img
            className="movie_poster"
            src={
              eachShow.poster_path === null
                ? defaultPoster
                : `https://image.tmdb.org/t/p/w500${eachShow.poster_path}`
            }
            alt="imagePoster"
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </div>
      ) : (
        <div className="movie_poster_skeleton" />
      )}
      {isImageLoaded && <h3 className="movie_name">{eachShow.name}</h3>}
      {isImageLoaded && (
        <div className="entity_info_container">
          <div className="movie_date">{eachShow.first_air_date?.slice(0, 4)}</div>
          <div className="vote_container">
            <img className="star" src={starIcon} alt="star_icon" />
            <div className="movie_vote">
              {eachShow.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
      )}
    </StyledShowLink>
  );
};

export default React.memo(EntityCardComponent(ShowCard));
