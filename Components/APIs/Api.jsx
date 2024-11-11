

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const API_URL = import.meta.env.VITE_GENRES_API_URL;


export const getGenreMovies = async(page,genreId) => {
  try {
    const response = await fetch(`${API_URL}?inc_video=false&language=en-US&page=${page}&with_genres=${genreId}`,
  {headers : {
    accept : "application/json",
    Authorization : `Bearer ${API_KEY}`  
  }})

  if(!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const DATA = await response.json()
  return DATA.results

  } catch(error) {
    return { error: true, message: error.message };
  }
}



export const getMovies = async(page,category) => {

  if(category === "rated") {
    category = "top_rated"
  }
  


  try {

    const query = `
      query { categoryMovies(page: ${page}, category: "${category}") { page results { original_language backdrop_path id title release_date vote_average poster_path } } }
    `

    const response = await fetch(`https://reelvault-server.vercel.app/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body : JSON.stringify({query})
  })

  if(!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`)
  }

  const DATA = await response.json()
  return DATA.data.categoryMovies.results
  
  } catch (error) {

    return {error : true , message : error.message}
  }
}


export const getShows = async(page) => {

  try {
    /* const query = `
      query {
        popularShows(page: ${page}) {
          page
          results {
            original_language
            id
            name
            first_air_date
            vote_average
            poster_path
          }
        }
      }
    ` */


    const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
  }})

    if(!response.ok) {
      throw new Error (`Failed to fetch Shows : ${response.status}`)
    }

    const DATA = await response.json()

    return DATA.results

  } catch (error) {
    return {error : true, message : error.message}
  }
}


export const getShowDetails = async(showId) => {
  try {
    const response  = await fetch(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`, {
    method: 'GET', 
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }})

  if (!response.ok) {
    throw new Error (`Failed to fetch Show Details : ${response.status}`)
  }

  const DATA = await response.json()
  return DATA
  
  } catch (error) {
    return {error : true, message : error.message}
  }
}

export const getMovieSearchData = async(entityName) => {

  let encodedEntityName = encodeURIComponent(entityName)

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodedEntityName}&include_adult=false&language=en-US&page=1`,{
      headers : {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  })


  const DATA = await response.json()
  const movieData = DATA.results
  
  let filteredData = movieData.filter(eachMovie => 
    eachMovie.poster_path && eachMovie.vote_count > 50 && eachMovie.release_date?.slice(0,4) > 1970
  );

  return filteredData

  } catch (error) {
    console.log(error)
  }
}


export const getShowSearchData = async(entityName) => {


  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${entityName}&include_adult=false&language=en-US&page=1`,{
      headers : {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  })
  
  const DATA = await response.json()
  const showData = DATA.results
  let filteredData = []

  showData.map(eachShow => {
    if(eachShow.poster_path && eachShow.vote_count > 50 && eachShow.first_air_date?.slice(0,4) > 1993) {
      filteredData.push(eachShow)
    }
  })
  
  return filteredData

  } catch (error) {
    console.log(error)
  }
}



export const getMovieReviews = async(movieId) => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, {
    method : "GET",
    headers : {
      accept : "application/json",
      Authorization : `Bearer ${API_KEY}`
    }})

    if(!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`)
    }

  const DATA = await response.json()

  return DATA.results
  } catch (err) {
    console.log(err.message)
  }

}


export const getShowReviews = async(showId) => {

  try {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}/reviews?language=en-US&page=1`,{
    method : "GET",
    headers : {
      accept : "application/json",
      Authorization : `Bearer ${API_KEY}`
    }
  })

  if(!response.ok) {
    throw new Error ("Could not fetch show reviews")
  }

  const DATA = await response.json()

  return DATA.results

  } catch (err) {
    console.log(err.message)
  }


}

export const getTrailer = async(movieId) => {

  try {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`,{
      method: "GET",
      headers : {
        accept : "application/json",
        Authorization : `Bearer ${API_KEY}`
      }  
    })

    const Data = await response.json()
    
    return Data.results.find(eachType => eachType.type === "Trailer" && eachType.size === 1080 || eachType.size === 2160)?.key

  } catch (err) {
    console.log(err.message)
  }


}


export const getShowTrailer = async(showId) => {

  try {

    const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}/videos?language=en-US`, {
    method : "GET",  
    headers : {
        accept : "application/json",
        Authorization : `Bearer ${API_KEY}`
      }
    })

    if(response.ok) {
      const Data = await response.json()
      return Data.results[0].key
    }

  } catch(err) {
    console.log(err.message)
  }

}






export const fetchMovieData = async(movieId) => {

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization : `Bearer ${API_KEY}`
          },
        });

        const DATA = await response.json()
        return DATA

      } catch (err) {
        console.log(err.message)
      }

}

export const fetchEpisodeNames = async (showId, seasonNumber) => {
  try {
    const query = `
      query {
        seasonInfo(showId: ${showId}, seasonId: ${seasonNumber}) {
          episodes {
            name
          }
        }
      }
    `;

    const response = await fetch(`https://reelvault-server.vercel.app/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw err; 
  }
};
