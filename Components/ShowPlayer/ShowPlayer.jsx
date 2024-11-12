import React, { useEffect,useRef, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import ShowDetails from "../Movie-ShowDetails/ShowDetails";
import { fetchEpisodeNames, getShowDetails, getShowTrailer } from "../APIs/Api";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { EpisodeLinkActions } from "../store/EpisodeLinkSlice";
import ServersContainer from "../ServersContainer/ServersContainer";
import { ACTION, initialShowState, reducer } from "../../helperFuncs/show_movie_reducer";



export default function ShowPlayer() {
  let {id, seasonNumber, episodeNumber} = useParams()
  seasonNumber = Number(seasonNumber);
  episodeNumber = Number(episodeNumber);
  const dispatch = useDispatch()

  const EpisodeLink = useSelector((state) => state.EpisodeLink.episodeLink);

  const [showState, showDispatch] = useReducer(reducer, initialShowState)
  const { showDataLoading, showTrailerKey, seasonEpisodeNames, showData, episodeList, seasonList } = showState;

  const showLoadContainer = useRef(null);
  const IframeShowElement = useRef(null);
  const showLoadedValue = useRef(showState.showLoaded)
  const [iframeLoaded,setIframeLoaded] = useState(false)


  useEffect(() => {
     
    
    const fetchShowData = async () => {
      showDispatch({type : ACTION.SET_SHOW_DATA_LOADING, payload : true})
      const ShowData = await getShowDetails(id);
      const ShowTrailerId = await getShowTrailer(id)
    
      showDispatch({type : ACTION.SET_SHOW_DATA, payload : ShowData})
      showDispatch({type : ACTION.SET_SHOW_DATA_LOADING, payload : false})
      let filteredSeasons = ShowData.seasons.filter(eachSeason => eachSeason.name !== "Specials" && eachSeason.air_date !== null)
      showDispatch({type : ACTION.SET_SEASON_LIST, payload : filteredSeasons})
      showDispatch({type : ACTION.SET_SHOW_TRAILER_KEY, payload: ShowTrailerId})
      
    };

    
    fetchShowData();
  
  }, [id]);

  useEffect(() => {
    setIframeLoaded(false);
    showLoadContainer.current.style.display = "flex"
    IframeShowElement.current.style.height = "0%"
    dispatch(EpisodeLinkActions.setEpisodeLink(`https://vidsrc.in/embed/tv/${id}/${seasonNumber}/${episodeNumber}`))
  },[id,seasonNumber,episodeNumber])


useEffect(() => {

  const getEpisodeNames = async () => {
    const seasonEpisodeNames = await fetchEpisodeNames(id,seasonNumber)

    showDispatch({type : ACTION.SET_SEASON_EPISODE_NAMES, payload : seasonEpisodeNames})
  }
  
  getEpisodeNames()


},[seasonNumber,id])


  function handleIframeLoad() {

    setIframeLoaded(true)
    showDispatch({type : ACTION.SET_SHOW_LOADED, payload : true})

    showLoadContainer.current.style.display = "none"
    IframeShowElement.current.style.height = "100%"
  }

  useEffect(() => {
    showLoadedValue.current = showState.showLoaded
  },[showState.showLoaded])


  return (
    <>

    <div className="back_button_container">
      <Link to="/" className="back_button">
        &#10094; Home
      </Link>

      <p className="watching_show_notice">Watching: {showData?.original_name ? showData.original_name : "..."}</p>
    </div>
    
      <div className="movie_player_container">
      
        <div ref={showLoadContainer} className="movie_player_skeleton">
          {!iframeLoaded && <img className="backdrop_image" src={`https://image.tmdb.org/t/p/original/${showData.backdrop_path}`} alt="show_backdrop" />}
          <LoadingAnimation />
        </div>  

          <iframe
            key={`${id}-${seasonNumber}-${episodeNumber}`}
            ref={IframeShowElement}
            className="show_player"
            src={EpisodeLink}
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
      </div>

      {<ServersContainer selectedEpisode={episodeNumber} selectedSeason={seasonNumber} showId={id}/>}

      {<ShowDetails showId={id} showDataLoading={showDataLoading} showTrailerKey={showTrailerKey} seasonEpisodeNames={seasonEpisodeNames} showData={showData} episodeList={episodeList} selectedSeason={seasonNumber} selectedEpisode={episodeNumber} seasonList={seasonList} showDispatch={showDispatch} /> }
    </>
  );
}
