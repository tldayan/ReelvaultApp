import React, {useEffect, useState } from 'react';
import { StyledResumeShowsContainer } from './ResumeShowsContainer.styles';
import { register } from 'swiper/element/bundle';
import { Link } from 'react-router-dom';
import playButton from "../../assets/play-solid.svg";
import { getUserShowDetails } from '../APIs/mongo/UserShowDetail';
import { deleteUserShowDetails } from '../APIs/mongo/deleteUserShowDetails';
import { useStytchSession, useStytchUser } from '@stytch/react';
register();

export default function ResumeShowsContainer() {
  const [userShows, setUserShows] = useState([]);
  const {session} = useStytchSession() 
  const {user} = useStytchUser()
  
  useEffect(() => {

    if(!session?.user_id) return

    const fetchUserShowDetails = async () => {
      const userShowDetails = await getUserShowDetails(session?.user_id);
      setUserShows(userShowDetails);
    };

    if (session?.user_id) {
      fetchUserShowDetails();
    }
    
  }, [session?.user_id]);

  const handleRemoveShow = async(showId) => {
      try {
        await deleteUserShowDetails(session?.user_id, showId);
        setUserShows((prevShows) => prevShows.filter((show) => show.showId !== showId));
      } catch (error) {
        console.error("Failed to delete user show details:", error);
      }
  };

    
    if(userShows.length === 0){
      return null
    }
  

  return (
    <>
    <h2 className='category_titles'>Welcome back {user?.name?.first_name}, resume where you left off ?</h2>
    <StyledResumeShowsContainer>
          <swiper-container slides-per-view="auto" mousewheel="false">
            {userShows.map(eachShow => (
              <swiper-slide className="eachShowSlide" key={eachShow?.showId}>
                <Link className='show_link' to={`/tvshows/${eachShow?.showId}/${eachShow?.showSeason}/${eachShow?.showEpisode}`}>
                  {eachShow?.poster_url ? (
                    <img className='show_poster' src={eachShow?.poster_url === null ? defaultPoster : `https://image.tmdb.org/t/p/w500${eachShow?.poster_url}`} alt="showPoster" />
                  ) : (
                    <div className="movie_poster_skeleton" style={{ width: '154px', height: '231px' }} />
                  )}
                  {eachShow?.poster_url && <span className='show_season'>s{eachShow?.showSeason}</span>}
                  {eachShow?.poster_url && <span className='show_episode'>e{eachShow?.showEpisode}</span>}
                  <div className='resumeShow_cover'>
                    <div className='watch_show_btn'>
                      <img className='play_button' src={playButton} alt="resume_icon" />
                    </div>
                    <p className='show_name'>{eachShow.showName}</p>
                  </div>
                </Link>
                <button onClick={() => handleRemoveShow(eachShow.showId)} className='remove_show_btn'>Remove {eachShow.showName}</button>
              </swiper-slide>
            ))}
          </swiper-container>
      </StyledResumeShowsContainer>
    </>
  );
}
