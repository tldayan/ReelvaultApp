import React, { useState, useEffect } from 'react'
import { StyledWatchlistContainer } from './Watchlist.style'
import WatchlistCard from './WatchlistCard'
import { Link } from 'react-router-dom'
import sadFace from "../../assets/sad_face.png"
import { fetchWatchlist } from '../../helperFuncs/fetchWatchlist'
import { useStytchSession } from '@stytch/react'

export default function Watchlist() {

  const { session } = useStytchSession()
  const userId = session?.user_id;

  const [watchlistEntities,setWatchlistEntities] = useState(() => {
    const storedWatchlist = localStorage.getItem("userWatchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });


  useEffect(() => {

    if(!userId) {
      setWatchlistEntities([])
      localStorage.removeItem("userWatchlist")
      return
    } 
    
    let isMounted = true

    const fetchWatchlistFunc = async() => {

      const userWatchlist = await fetchWatchlist(userId)
      
      if(isMounted) {
        setWatchlistEntities(userWatchlist)
      }
    }

    fetchWatchlistFunc()

    return () => {
      isMounted = false
    }
  
  }, [userId])


  return (
    <StyledWatchlistContainer>
        <h3>Watchlist</h3>
        <div className='watchlist'>
        {watchlistEntities?.length ? watchlistEntities.map(eachEntity => {
          const key = eachEntity.entityId;
          return <WatchlistCard key={key} eachEntity={eachEntity} />;
        }) : <div className="empty_watchlist">
              <img className='watchlist_empty_icon' src={sadFace} alt="" />
              <p className='watchlist_notice'>Your watchlist is currently empty.</p>
              <Link to="/" className='return_home_btn'>Browse</Link>
            </div>}
        </div>
    </StyledWatchlistContainer>
    
  )
}
