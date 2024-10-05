export const initialShowState = {
  showData: {},
  showDataLoading: false,
  seasonList: [],
  episodeList: [],
  showLoaded: false,
  showTrailerKey: "",
  seasonEpisodeNames: [],
};

export const initialMovieState = {
  movieData : {},
  movieDataLoading : false,
  trailerKey : "",
  movieLoaded : false,
  movieIframe : ""
}


export const ACTION = {
  //SHOW STATE ACTIONS
  SET_SHOW_DATA : "SET_SHOW_DATA",
  SET_SHOW_DATA_LOADING: "SET_SHOW_DATA_LOADING",
  SET_SEASON_LIST: "SET_SEASON_LIST",
  SET_EPISODE_LIST: "SET_EPISODE_LIST",
  SET_SHOW_LOADED: "SET_SHOW_LOADED", 
  SET_SHOW_TRAILER_KEY: "SET_SHOW_TRAILER_KEY",
  SET_SEASON_EPISODE_NAMES : "SET_SEASON_EPISODE_NAMES",

  //MOVIE STATE ACTIONS 
  SET_MOVIE_DATA : "SET_MOVIE_DATA",
  SET_MOVIE_DATA_LOADING: "SET_MOVIE_DATA_LOADING",
  SET_MOVIE_TRAILER_KEY : "SET_MOVIE_TRAILER_KEY",
  SET_MOVIE_LOADED : "SET_MOVIE_LOADED",
  SET_MOVIE_IFRAME: "SET_MOVIE_IFRAME"
}


export const reducer = (state, action) => {

  //SHOW STATE LOGIC
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

  //MOVIE STATE LOGIC
  else if(action.type === ACTION.SET_MOVIE_DATA) {
    return {...state, movieData: action.payload}
  } else if(action.type === ACTION.SET_MOVIE_DATA_LOADING) {
    return {...state, movieDataLoading : action.payload}
  } else if(action.type === ACTION.SET_MOVIE_TRAILER_KEY) {
    return {...state, trailerKey : action.payload}
  } else if(action.type === ACTION.SET_MOVIE_LOADED) {
    return {...state, movieLoaded : action.payload}
  } else if(action.type === ACTION.SET_MOVIE_IFRAME) {
    return {...state, movieIframe: action.payload}
  }

}