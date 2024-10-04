import React, { useEffect,useState,useRef, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ScrollRestoration, Link } from "react-router-dom";
import ShowDetails from "../Movie-ShowDetails/ShowDetails";
import { fetchEpisodeNames, getShowDetails, getShowTrailer } from "../APIs/Api";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { EpisodeLinkActions } from "../store/EpisodeLinkSlice";
import ServersContainer from "../ServersContainer/ServersContainer";


const initialShowState = {
  showData: {},
  showDataLoading: false,
  seasonList: [],
  episodeList: [],
  showLoaded: false,
  showTrailerKey: "",
  seasonEpisodeNames: [],
};

export const ACTION = {
  SET_SHOW_DATA : "SET_SHOW_DATA",
  SET_SHOW_DATA_LOADING: "SET_SHOW_DATA_LOADING",
  SET_SEASON_LIST: "SET_SEASON_LIST",
  SET_EPISODE_LIST: "SET_EPISODE_LIST",
  SET_SHOW_LOADED: "SET_SHOW_LOADED", 
  SET_SHOW_TRAILER_KEY: "SET_SHOW_TRAILER_KEY",
  SET_SEASON_EPISODE_NAMES : "SET_SEASON_EPISODE_NAMES"
}


const reducer = (state, action) => {
  if(action.type === ACTION.SET_SHOW_DATA) {
    return {...state, showData : action.payload}
  } else if (action.type === ACTION.SET_SHOW_DATA_LOADING) {
    return {...state, showDataLoading: action.payload}
  } else if(action.type === ACTION.SET_SEASON_LIST) {
    return {...state, seasonList : action.payload}
  } else if(action.type === ACTION.SET_SHOW_TRAILER_KEY) {
    return {...state, showTrailerKey : action.payload}
  } else if(action.type === ACTION.SET_SEASON_EPISODE_NAMES) {
    return {...state, seasonEpisodeNames : action.payload}
  } else if(action.type === ACTION.SET_SHOW_LOADED) {
    return {...state, showLoaded : action.payload}
  } else if(action.type === ACTION.SET_EPISODE_LIST) {
    return {...state, episodeList : action.payload}
  }
}

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
    </div>
      
      
      <div className="movie_player_container">
        <p className="watching_show_notice">Watching: {showState.showData?.original_name ? showState.showData.original_name : "..."}</p>
            
        <div ref={showLoadContainer} className="movie_player_skeleton">
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
      <ScrollRestoration top={true} />
    </>
  );
}
