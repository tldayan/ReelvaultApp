import React, { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { EpisodeLinkActions } from "../store/EpisodeLinkSlice";
import { ShowDetailsContainer } from "./Movie-ShowDetails.styles";
import Reviews from "../Reviews/Reviews";
import Recommended from "../Recommended/Recommended";
import { showsWatchlistActions } from "../store/showsWatchlistSlice";
import eye from "../../assets/eye.png"
import { UpdateUserShowDetails } from "../APIs/mongo/UpdateUserShowDetails";
import { getUserShowDetails } from "../APIs/mongo/UserShowDetail";
import EntityDetailsSkeleton from "./EntityDetailsSkeleton";
import { deleteUserShowDetails } from "../APIs/mongo/deleteUserShowDetails";
import { useNavigate} from "react-router-dom";
import { useStytchSession } from "@stytch/react";

export default function ShowDetails({ showId,showDataLoading,seasonEpisodeNames,showData,showTrailerKey,setEpisodeList,selectedEpisode,episodeList,selectedSeason,seasonList }) {

  const dispatch = useDispatch()
  const { session } = useStytchSession();
  const userId = session?.user_id;
  const seasonsContainer = useRef(null);
  let episodeButton = useRef(null)
  let episodeListContainer = useRef(null) 
  const navigate = useNavigate()

  useEffect(() => {
    if(seasonList && seasonList.length > 0) {
      const newEpisodeList = [];
      for (
        let i = 0; i < seasonList[selectedSeason - 1]?.episode_count || 0 ;i++) {
          newEpisodeList.push(i);
        }
      setEpisodeList(newEpisodeList);
    }
    

  }, [seasonList, selectedSeason]);


  const handleSeasonSelect = (index) => {
    navigate(`../tvshows/${showId}/${index}/1`)
    seasonsContainer.current.classList.add("hide")
  };


  useEffect(() => { 


    let isLastEpisodeOfLastSeason = seasonList[seasonList?.length - 1]?.episode_count === selectedEpisode && seasonList?.length === selectedSeason

    if(userId && isLastEpisodeOfLastSeason) {

        const deleteUserShowDetailsReq = async() => {
          await deleteUserShowDetails(userId,showId)
        }
  
        deleteUserShowDetailsReq()
      } else if((selectedEpisode > 1 || selectedSeason > 1) && userId && showData.name) {

      const UpdateUserShowsDetailsRequest = async() => {
        
            const ShowDetails = {showId : showId, showName : showData?.name, poster_url : showData?.poster_path, showSeason : selectedSeason, showEpisode : selectedEpisode}
            
            await UpdateUserShowDetails(ShowDetails,userId)
        }
      
      UpdateUserShowsDetailsRequest()
    
    } else if (userId) {
        const fetchUserShowDetails = async() => {
  
          const fetchUserShowDetailsReq = await getUserShowDetails(userId)
  
          if(fetchUserShowDetailsReq === 404) {
            return
          } else {
  
            const showExists = fetchUserShowDetailsReq.some((eachObj) => eachObj?.showId === showId)

            if(showExists) {
              const currentShow = fetchUserShowDetailsReq.find((eachObj) => eachObj?.showId === showId)
  
              navigate(`../tvshows/${showId}/${currentShow.showSeason}/${currentShow.showEpisode}`)
              handleEpisodeSelect(currentShow?.showSeason,currentShow?.showEpisode)
            }
          }
        }

        fetchUserShowDetails()
    }

  },[selectedEpisode,selectedSeason])
  
    
  const handleEpisodeSelect = (seasonNumber, episodeNumber) => {
    dispatch(
      EpisodeLinkActions.setEpisodeLink(
        `https://vidsrc.in/embed/tv/${showId}/${seasonNumber}/${episodeNumber}`
      )
    );
    navigate(`../tvshows/${showId}/${seasonNumber}/${episodeNumber}`)
  };





  useEffect(() => {
    dispatch(
      EpisodeLinkActions.setEpisodeLink(
        `https://vidsrc.in/embed/tv/${showId}/${selectedSeason}/${selectedEpisode}`
      )
    );
  },[selectedSeason])

  function openSeasonsContainer() {
    seasonsContainer.current.classList.toggle("hide") 
  }



  useEffect(() => {

    window.scrollTo(0, 0);
  
    if (episodeListContainer.current) {

      const activeEpisodeButton = episodeListContainer.current.querySelector(".episode_buttons.active");
  
      if (activeEpisodeButton) {
        setTimeout(() => {
          episodeListContainer.current.scroll({
            top: activeEpisodeButton.offsetTop - episodeListContainer.current.offsetTop,
            behavior: "smooth"
          });
        }, 500); 
      }
    }
  }, [selectedEpisode, selectedSeason, showData]);
  
  

  const watchlist = useSelector((state) => state.showsWatchlist)

  function handleWatchlist() {
    
    if(watchlist.some(eachEntity => eachEntity?.showId == showId)) {
      dispatch(showsWatchlistActions.removeFromWatchlist(showId))
    } else {
      dispatch(showsWatchlistActions.addToWatchlist(showData))
    }
  }

  
  const shareEntity = () => {
    const shareData = {
      title: showData?.name,
      text: `Watch ${showData?.name}:`,
      url: window.location.href,
    };
    
     if(window.navigator.canShare(shareData)) {
      window.navigator.share(shareData)
     } else{
      return
     }
  }


  return (
    <>
      {!showDataLoading ? <ShowDetailsContainer media={900}>
        <img
          className="movie_details_poster"
          src={`https://image.tmdb.org/t/p/original${showData?.poster_path}`}
          alt="poster"
        />
        <div className="show_info_container">
          <h1 className="movie_title">{showData?.name}</h1>
          <p className="movie_overview">{showData?.overview}</p>
          <div className="movie_stats_container">
            <div className="first_stats_container">
            {showData?.genres?.length > 0 && (
                <p className="entity_genre">
                  Genre: <span className="entity_info">{showData?.genres.map((eachgenre) => eachgenre?.name).join(", ")}</span>
                </p>
              )}
              {showData?.production_companies?.length > 0 && (
                <p className="entity_production">
                  Production:{" "}
                  <span className="entity_info">{showData?.production_companies[0]?.name}</span>
                </p>
              )}
              
            </div>
            <div className="second_stats_container">
            <p className="entity_language">
                Language:{" "}
                <span className="entity_info">{showData?.original_language &&
                  showData?.original_language.toUpperCase()}</span>
              </p>
              {showData?.first_air_date && (
                <p className="entity_released">Released: <span className="entity_info">{showData?.first_air_date}</span></p>
              )}
              {showData?.production_countries?.length > 0 && (
                <p className="entity_country">Country: <span className="entity_info">{showData?.production_countries[0]?.name}</span></p>
              )}
            
            </div>
            

          </div>
          <div className="buttons_container">
            {showTrailerKey && <button onClick={() => window.open(`https://www.youtube.com/watch?v=${showTrailerKey}`)} className={`trailer_btn`}><img className="eye_icon" src={eye} loading="lazy"></img>Trailer</button>}
            <button className="share_btn" onClick={shareEntity}>Share</button>
            <button className={`watchlist_btn ${watchlist.some(eachEntity => eachEntity.showId == showId) ? "active" : ""}`} onClick={handleWatchlist}>{watchlist.some(eachEntity => eachEntity.showId == showId) ? "In Watchlist" : "+ Watchlist"}</button>
          </div>
        </div>
        <div className="shows_list_container">
          <div className="main_season_list_container">
            <button onClick={openSeasonsContainer} className="seasons_button">
              Season {selectedSeason}&nbsp;&#9660;
            </button>
            <ul ref={seasonsContainer} className="season_list_container hide">
              {seasonList?.map((eachSeason, index) => {
                return (
                  <li key={eachSeason?.id}>
                    <button
                      onClick={() => handleSeasonSelect(index + 1)}
                      className={`season_button ${selectedSeason === index + 1 && `active`}`}
                    >
                      Season {index + 1}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div ref={episodeListContainer} className="main_episode_list_container">
            <ul className="episode_list_container">
              {episodeList?.map((index) => {
                return (
                  <li key={index + 1}>
                    <button
                      onClick={() =>
                        handleEpisodeSelect(selectedSeason, index + 1)
                      }
                      ref={episodeButton}
                      className={`episode_buttons ${
                        selectedEpisode === index + 1 ? "active" : null
                      }`}
                    >
                      Episode {index + 1} - {seasonEpisodeNames?.episodes && seasonEpisodeNames.episodes[index]?.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </ShowDetailsContainer> : <EntityDetailsSkeleton />}
      <Reviews showId={showId}/>
      <Recommended showId={showId}/>
    </>
  );
}