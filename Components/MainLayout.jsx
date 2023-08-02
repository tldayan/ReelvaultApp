
import {NavLink,Link, Outlet} from "react-router-dom"
import starIcon from "../assets/star-solid.svg"
import searchIcon from "../assets/search_icon.svg"
import {React,useState,useEffect} from 'react'

export default function MainLayout() {

    const [search,setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [animationPlaying, setAnimationPlaying] = useState(true)
  
    
    useEffect(() => {
  
      const searchApi = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
  
      const fetchSearchData = async() => {
  
        try {
  
          const response = await fetch(searchApi , {
                  headers : {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM1ZTU5YjRmMGUxMDQ1ODRjMzRlMjRmODZlOWJjMCIsInN1YiI6IjY0NTYzNzFlYzNjODkxMDEwNDE4ZWNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhRGCPIxeuJxggm9kJSFa7zmeFMV3byY4l9KprRAMxo'
                  }
          })
  
          const Data = await response.json()
  
          const searchData = await Data.results;
          
            setSearchResults(searchData)

        } catch (error) {
          alert(error.message)
        }
  
      }
  
      if(search === 0) {
        return
      } else {
        fetchSearchData()
      }
     
    },[search])


    useEffect(() => {
        const results = document.querySelector(".search_list");
        if (search) {
          results.style.padding = "0";
          results.style.boxShadow = "0px 0px 2px 0px rgba(0, 0, 0, 0.2)"
        } else {
          results.style.boxShadow = "none"
          
        }
      }, [search]);

      useEffect(() => {
        const results = document.querySelector(".search_list");
        if(searchResults.length === 1) {
          results.style.height = "105px"
        } else if(searchResults.length === 0) {
          results.style.height = "0px"
        } else {
          results.style.height = "100vh"
        }
      },[searchResults])

    const results = document.querySelector(".search_list")
    const searchField = document.querySelector('.search_field');
    
    function expandSearchBar() {
        
        let currentWidth = searchField.style.width
        if (currentWidth === "100%" ) {
            searchField.style.width = "0%"
            results.style.display = "none"


        } else {
            searchField.style.width = "100%"
            results.style.display = "flex"
        }
    }
    
    const mobileMenu = document.querySelector("ul");
    const hamburger = document.getElementById('hamburger');
    
    function openHamburger() {

        const navLinks = document.querySelector(".nav_links")
      
        hamburger.classList.toggle('open');
      
        if (hamburger.classList.contains("open")) {
          mobileMenu.style.left = "0%";
          
        } else {
          mobileMenu.style.left = "100%";
        }
      }

      function returnHome() {
        mobileMenu.style.left = "100%";
        hamburger.classList.toggle("open")
        
      }
      

    function closeResultList() {
      setSearchResults([])
      results.style.height = "0px"
      searchField.style.width = "0%"
    }

  return (
    <div className="App">
        <header>
            <nav>
                <Link to="/" className="logo">ReelVault</Link>
                
                <div className="search_container">
                    <input
                        className='search_field'
                        type="text"
                        placeholder='Search movies...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='search_list'>
                        {searchResults.map(eachResult => {
                        return  <Link onClick={closeResultList} to={`${eachResult.id}`} key={eachResult.id} className='result'>
                                    <img className='search_results_movie_poster' src={`https://image.tmdb.org/t/p/w154${eachResult.poster_path}`} alt="" />
                                    <div className='movie_result_info_container'>
                                      <p className='search_results_movie_title'>{eachResult.original_title}</p>
                                      <p className='release_date'>{eachResult.release_date}</p>
                                      <div className='movie_metrics_container'>
                                          <p>Movie</p>&#8226;
                                          <p>{eachResult.original_language.charAt(0).toUpperCase() + eachResult.original_language.slice(1)}
                                          </p>&#8226;
                                          <img className="star" src={starIcon} alt="" />
                                          <p>{eachResult.vote_average.toFixed(2)}</p>
                                      </div>
                                    </div>
                                </Link>
                        })}
                    </div>
                    <img
                    onClick={expandSearchBar}
                    className="search_icon" src={searchIcon} alt="" 
                    />
                </div>
                <ul className="nav_container">
                    <NavLink to="/" className="nav_links" onClick={returnHome}>Home</NavLink>
                    <NavLink to="about" className="nav_links" onClick={returnHome}>About</NavLink>
                    {/* <NavLink to="/#movies_section" className="nav_links">Movies</NavLink> */}
                    <NavLink to="contactus" className="nav_links" onClick={returnHome}>Contact</NavLink>
                </ul>
                <div className="container">
                    <div id="hamburger" onClick={openHamburger}>
                        <svg width="50" height="50" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </div>
                </div>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Link to="/" className="logo">ReelVault</Link>
            <p className="copyright">&copy; 2023 ReelVault. All rights reserved.</p>
        </footer>

    </div>
  )
}
