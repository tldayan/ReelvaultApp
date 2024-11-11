import React from 'react'
import { Link } from 'react-router-dom'
import defaultPoster from "../../assets/no_image.jpg"


export default function WatchlistCard({eachEntity}) {  
  
 let entityType = entityEntity.title ? "movie" : "show"
  
  return (
    <Link to={`${entityType === "show" ? `../tvshows/${eachEntity.entityId}/1/1` : `../${eachEntity.entityId}`}`} key={eachEntity.entityId} className='watchlistCard'>
      <img className='watchlist_poster' src={eachEntity.poster_path !== null ? `https://image.tmdb.org/t/p/original${eachEntity.poster_path}` : defaultPoster} alt="" />
      <div className='watchlist_metrics'>
        <p className='watchlist_entity_title'>{entityType === "movie" ? eachEntity.title : eachEntity.name}</p>
        <p className='entity_date'>{entityType === "movie" ? eachEntity.release_date : eachEntity.first_air_date}</p>
        <p className='entity_type'>{entityType === "show" ? "Show" : "Movie"}</p>
        <p className='entity_overview'>{eachEntity.overview}</p>
      </div>
    </Link>
  )
}
