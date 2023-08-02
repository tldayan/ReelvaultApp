
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function AdventureMovies() {

  const [adventureMovies, setAdventureMovies] = useState([])

  useEffect(() => {

    const fetchAdventureMovies = async() => {

      try {

        const response1 = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=12",{
        headers : {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM1ZTU5YjRmMGUxMDQ1ODRjMzRlMjRmODZlOWJjMCIsInN1YiI6IjY0NTYzNzFlYzNjODkxMDEwNDE4ZWNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhRGCPIxeuJxggm9kJSFa7zmeFMV3byY4l9KprRAMxo'
        }})
        const response2 = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&with_genres=12",{
        headers : {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM1ZTU5YjRmMGUxMDQ1ODRjMzRlMjRmODZlOWJjMCIsInN1YiI6IjY0NTYzNzFlYzNjODkxMDEwNDE4ZWNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhRGCPIxeuJxggm9kJSFa7zmeFMV3byY4l9KprRAMxo'
        }})

        const data1 = await response1.json()
        const data2 = await response2.json()

        const data = [...data1.results, ...data2.results]
        
        setAdventureMovies(data)

      } catch (error) {
        alert(error.message)
      }
    }


    fetchAdventureMovies()

  },[])



  return (
    <div className='movietype_container'>
        <h2 className='category_titles'>Adventure Movies</h2>
        <div className='movielist_container'>
          {!adventureMovies.length ? <div className="load_animation"></div> : adventureMovies.map(eachMovie => {
            return <Link to={`/${eachMovie.id}`} className="movie_container" key={eachMovie.id}>
            <div className="movie_poster_container">
              <div className="movie_language">{eachMovie.original_language.toUpperCase()}</div>
              <div className="movie_date">{eachMovie.release_date.slice(0,4)}</div>
              <div className={"movie_vote " + (eachMovie.vote_average > 7 ? "green" : eachMovie.vote_average < 5 ? "red" : "orange")}>{eachMovie.vote_average}</div>
              <img className="movie_poster" src={eachMovie.poster_path === null ? defaultPoster : `https://image.tmdb.org/t/p/w154${eachMovie.poster_path}`} alt="" />
            </div>
            <h3 className='movie_name'>{eachMovie.title.length > 20 ? `${eachMovie.title.slice(0, 20)}...` : eachMovie.title}</h3>
          </Link>
          })}
        </div>
    </div>
  )
}
