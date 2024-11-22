
import React, { useEffect, useState,memo } from 'react'
import {Link} from "react-router-dom"
import { register } from 'swiper/element/bundle';
import defaultPoster from "../../assets/no_image.jpg"
import { RecommendedContainer } from './Recommended.styles';
import { useDispatch } from 'react-redux';
import { MovieNameActions } from '../store/MovieNameSlice';
import { ShowNameActions } from '../store/ShowNameSlice';
register();

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

function Recommended({movieId,showId}) {

    const [recommendedMovieData, setRecommendedMovieData] = useState([])
    const [recommendedShowData, setRecommendedShowData] = useState([])
    
    const API_URL = `https://api.themoviedb.org/3/${movieId ? "movie" : "tv"}/${movieId ? movieId : showId}/recommendations?language=en-US&page=1`
    useEffect(() => {
        const fetchRecommendedData = async() => {

            try {
                const response = await fetch(API_URL,{
                headers :{
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`
                }
                })

                const data = await response.json()
                if(data.results[0]?.media_type === "movie") {
                  setRecommendedMovieData(data.results)  
                } else if(data.results[0]?.media_type === "tv") {
                  setRecommendedShowData(data.results)
                }  

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchRecommendedData()

    },[movieId,showId])

    const dispatch = useDispatch()

    function handleNameChange(entityName) {
        if(recommendedMovieData.length > 0) {
          dispatch(MovieNameActions.setMovieName(entityName))  
        } else {
          dispatch(ShowNameActions.setShowName(entityName))
        }
    }


  return (
    ((recommendedShowData.length > 0 || recommendedMovieData.length > 0) && <RecommendedContainer>
       <h4 className='category_titles'>Recommended {recommendedShowData.length > 0 ? "Shows" : "Movies"}</h4>
       <swiper-container slides-per-view="auto" mousewheel="true">
        {recommendedMovieData.length > 0 ? recommendedMovieData.map(eachMovie => { 
            if(eachMovie?.poster_path && eachMovie?.vote_count > 50 && eachMovie?.release_date?.slice(0,4) > 2000) {
                return (
                <swiper-slide key={eachMovie?.id}>
                    <Link className='recommended_link' onClick={() => handleNameChange(eachMovie?.original_title)} to={`../movies/${eachMovie?.id}`}>
                      <img className='recommended_movie_poster' src={eachMovie?.poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w500${eachMovie?.poster_path}`} loading='lazy' alt="entity_poster" />
                    </Link><p className='recommended_movie_title'>{eachMovie?.title}</p>
                </swiper-slide>
              )
            }
        })
        :
        recommendedShowData.map(eachShow => { 
            if(eachShow?.poster_path && eachShow?.vote_count > 50 && eachShow?.first_air_date?.slice(0,4) > 1993) {
                return (
                <swiper-slide key={eachShow?.id}>
                    <Link className='recommended_link' onClick={() => handleNameChange(eachShow?.original_name)} to={`../tvshows/${eachShow?.id}/1/1`}><img className='recommended_movie_poster' src={eachShow?.poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w500${eachShow?.poster_path}`} alt="poster_img" /><p className='recommended_movie_title'>{eachShow?.name}</p>
                    </Link>
                </swiper-slide>
              )
            }
        })}
       </swiper-container> 
    </RecommendedContainer>)
    
  )
}

export default memo(Recommended)