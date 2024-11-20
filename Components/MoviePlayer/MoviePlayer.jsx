import {React, useEffect, useRef, useReducer } from "react";
import {useNavigate, useParams } from "react-router-dom";
import MovieDetails from "../Movie-ShowDetails/MovieDetails";
import { ScrollRestoration, Link } from "react-router-dom";
import { MoviePlayerContainer } from "./MoviePlayer.styles";
import { fetchMovieData, getTrailer } from "../APIs/Api";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import ServersContainer from "../ServersContainer/ServersContainer";
import { ACTION, initialMovieState, reducer } from "../../helperFuncs/show_movie_reducer";



export default function MoviePlayer() {
  const navigate = useNavigate()
  const params = useParams();
  const movieId = params.id;

  const [movieState, dispatch] = useReducer(reducer, initialMovieState)

  const {movieData,movieDataLoading,trailerKey, movieLoaded, movieIframe} = movieState
  
  const movieLoadContainer = useRef(null);
  const IframeElement = useRef(null);
  const movieLoadedRef = useRef(movieState.movieLoaded);


  useEffect(() => {

    const fetchMovieDetails = async() => {
      dispatch({type : ACTION.SET_MOVIE_DATA_LOADING, payload: true})

      try {

        const movieData = await fetchMovieData(movieId);
        const movieTrailerKey = await getTrailer(movieId);

        dispatch({type : ACTION.SET_MOVIE_TRAILER_KEY, payload: `${movieTrailerKey}`})
        dispatch({type : ACTION.SET_MOVIE_DATA, payload: movieData})
        dispatch({type : ACTION.SET_MOVIE_IFRAME, payload : `https://www.2embed.cc/embed/${movieId}`})
        dispatch({type : ACTION.SET_MOVIE_DATA_LOADING, payload: false})

    } catch (err) {
      console.log(err.message)
    }
  }


  if (!/^\d+$/.test(params.id)) { // if id does not contain any numerical values.
    navigate("/error");
    return
  }

  fetchMovieDetails()
  dispatch({type: ACTION.SET_MOVIE_IFRAME, payload: `https://www.2embed.cc/embed/${movieId}`})
    
  }, [movieId]);


  useEffect(() => {
    movieLoadedRef.current = movieLoaded;
  }, [movieLoaded]);

  
  function handleIframeLoad() {
    dispatch({type : ACTION.SET_MOVIE_LOADED, payload : true})

    movieLoadContainer.current.style.display = "none"
    IframeElement.current.style.height = "100%"
  }

  return (
    <>
    
    <div className="back_button_container">
      <Link to="/" className="back_button">
        &#10094; Home
      </Link>
    </div>
      
      <MoviePlayerContainer>
      <p className="watching_movie_notice">Watching: {movieData.original_title ? movieData.original_title : "..."}</p>
      <div ref={movieLoadContainer} className="movie_player_skeleton">
    <LoadingAnimation />
  </div>
  
  <iframe
    ref={IframeElement}
    className="movie_player"
    src={movieIframe} /* .to before */
    allowFullScreen
    onLoad={handleIframeLoad}
  ></iframe>

  <ServersContainer movieId={movieId} movieIframe={movieIframe} dispatch={dispatch}/>

      </MoviePlayerContainer>
      {/^\d+$/.test(params.id) && <MovieDetails trailerKey={trailerKey} movieData={movieData} movieDataLoading={movieDataLoading} movieId={movieId} />}
      <ScrollRestoration top={true} />
    </>
  );
}
