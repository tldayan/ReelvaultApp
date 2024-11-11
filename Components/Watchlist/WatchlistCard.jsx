import React from 'react'
import { Link } from 'react-router-dom'
import defaultPoster from "../../assets/no_image.jpg"


export default function WatchlistCard({eachEntity}) {  
  
  return (
    <Link to={`${eachEntity.entityType === "Show" ? `../tvshows/${eachEntity.entityId}/1/1` : `../movies/${eachEntity.entityId}`}`} key={eachEntity.entityId} className='watchlistCard'>
      <img className='watchlist_poster' src={eachEntity.entityPosterUrl !== null ? `https://image.tmdb.org/t/p/w500${eachEntity.entityPosterUrl}` : defaultPoster} alt="poster" />
      <div className='watchlist_metrics'>
        <p className='watchlist_entity_title'>{eachEntity.entityName}</p>
        <p className='movie_date'>{eachEntity.entityReleaseDate}</p>
        <p className='movie_date'>{eachEntity.entityType}</p>
        <p className='entity_overview'>{eachEntity.entityDescription}</p>
      </div>
    </Link>
  )
}
