import React from 'react'
import { StyledServersContainer } from './ServerContainer.styles'
import { useDispatch, useSelector } from 'react-redux'
import { EpisodeLinkActions } from '../store/EpisodeLinkSlice'
import { ACTION } from '../../helperFuncs/show_movie_reducer'

export default function ServersContainer({dispatch,selectedEpisode,selectedSeason,showId,movieId,movieIframe}) {

  let iframeLink = undefined
  const reduxDispatch = useDispatch()
  let server = undefined

  const checkServer = (iframe) => {
    return iframe.includes("in") ? "vidsrc.in" : iframe.includes("xyz") ? "vidsrc.xyz" : "2embed"
  }

  if(showId) {
    iframeLink = useSelector((state) => state.EpisodeLink.episodeLink);
    server = checkServer(iframeLink)
  } else {
    server = checkServer(movieIframe)
  }
  

  const setSource = (iframeLink) => {
    if(showId) {
      reduxDispatch(EpisodeLinkActions.setEpisodeLink(iframeLink))
    } else if (dispatch) {
      dispatch({type : ACTION.SET_MOVIE_IFRAME, payload : iframeLink})
    }
  }

 

  return (
    <StyledServersContainer>
        <div className="server_buttons_container">
          <button className={server === "2embed" ? "active" : ""} onClick={() => setSource(showId ? `https://www.2embed.cc/embedtv/${showId}&s=${selectedSeason}&e=${selectedEpisode}` : `https://www.2embed.cc/embed/${movieId}`)}>Server 1</button>
          <button className={server === "vidsrc.xyz" ? "active" : ""} onClick={() => setSource(showId ? `https://vidsrc.xyz/embed/tv/${showId}/${selectedSeason}/${selectedEpisode}` : `https://vidsrc.xyz/embed/movie/${movieId}`)}>Server 2</button>
          <button className={server === "vidsrc.in" ? "active" : ""} onClick={() => setSource(showId ? `https://vidsrc.in/embed/tv/${showId}/${selectedSeason}/${selectedEpisode}` : `https://vidsrc.in/embed/movie?tmdb=${movieId}` )}>Server 3</button>
        </div>
      </StyledServersContainer>
  )
}
