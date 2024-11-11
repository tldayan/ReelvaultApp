import Recommended from "../Recommended/Recommended";
import Reviews from "../Reviews/Reviews";
import { MovieDetailsContainer } from "./Movie-ShowDetails.styles";
import EntityDetailsSkeleton from "./EntityDetailsSkeleton";
import { useStytchSession } from "@stytch/react";
import { handleWatchlist } from "../../helperFuncs/handleWatchlist";
import { useState } from "react";

export default function MovieDetails({movieData,movieDataLoading,movieId,trailerKey}) {

  const { session } = useStytchSession()
  const userId = session?.user_id;
  const [userWatchlist,setUserWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem('userWatchlist')) || []
  })

  const shareEntity = () => {
    const shareData = {
      title: movieData?.original_title,
      text: `Watch ${movieData?.original_title}:`,
      url: window.location.href,
    };
    
     if(window.navigator.canShare(shareData)) {
      window.navigator.share(shareData)
     } else{
      return
     }
  }

  const isInWatchlist = (userWatchlist || []).some(eachEntity => eachEntity.entityId === showId);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('userWatchlist')) || [];
    setUserWatchlist(storedWatchlist);
  }, []);


  const handleWatchlistClick = async() => {

    const updatedWatchList = await handleWatchlist(movieId,userId,movieData,isInWatchlist)

    setUserWatchlist(updatedWatchList)

    localStorage.setItem("userWatchlist", JSON.stringify(updatedWatchList));

  }

  return (
    <>
      {!movieDataLoading ? <MovieDetailsContainer media={900}>
        <img
          className="movie_details_poster"
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt="movie_poster"
        />
        <div className="movie_info_container">
          <h1 className="movie_title">{movieData.original_title} </h1>
          <p className="movie_overview">{movieData.overview}</p>
          
          <div className="movie_stats_container">
            <div className="first_stats_container">
            <p className="entity_language">
                Language:{" "}
                <span className="entity_info">{movieData.original_language &&
                  movieData.original_language.toUpperCase()}</span>
              </p>
              <p className="entity_released">Released: <span className="entity_info">{movieData.release_date}</span></p>
              {movieData?.genres?.length > 0 && (
                <p className="entity_genre">
                  Genre: <span className="entity_info">{movieData.genres.map((eachgenre) => eachgenre.name).join(", ")}</span>
                </p>
              )}
            </div>
            <div className="second_stats_container">
              <p className="entity_duration">Duration: <span className="entity_info">{movieData.runtime} min</span></p>
              {movieData?.production_countries?.length > 0 && (
                <p className="entity_country">Country: <span className="entity_info">{movieData.production_countries[0].name}</span></p>
              )}
              {movieData?.production_countries?.length > 0 && (
                <p className="entity_production">
                  Production:{" "}
                  <span className="entity_info"><span className="entity_info">{movieData.production_countries[0].name}</span></span>
                </p>
              )}
            </div>
            
          </div>
          <div className="buttons_container">
            <button className="share_btn" onClick={shareEntity}>Share</button>
            <button className={`watchlist_btn ${isInWatchlist ? "active" : ""}`} onClick={handleWatchlistClick}>{isInWatchlist ? "In Watchlist" : "+ Watchlist"}</button>
          </div>
        </div>
        { Object.keys(movieData)?.length !== 0  && trailerKey !== "null" && <iframe className="trailer" src={`https://www.youtube.com/embed/${trailerKey}`} title="YouTube player" frameBorder="0" allow="encrypted-media; fullscreen"></iframe>}
      </MovieDetailsContainer> : <EntityDetailsSkeleton /> }
      
      <Reviews movieId={movieId}/>

      <Recommended movieId={movieId} />
    </>
  );
}
