import React, { useEffect, useRef, useState, useMemo } from 'react';
import { getMovieSearchData, getShowSearchData } from '../APIs/Api';
import sadFace from "../../assets/sad_face.png";
import searchIcon from "../../assets/search_icon.svg";
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import { StyledSearchBar } from './SearchBar.styles';

function removeSpecialCharacters(input) {
  return input.replace(/[:\-]/g, "").toLowerCase();
}

export default function SearchBar() {
  const searchInput = useRef(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDataLoading, setSearchDataLoading] = useState(false);
  const searchField = useRef(null);
  const searchList = useRef(null);

  const fetchSearchData = async (entitySearch) => {

    try {
      const [movieResponse, showResponse] = await Promise.all([
        getMovieSearchData(entitySearch),
        getShowSearchData(entitySearch)
      ]);

      const searchData = [...movieResponse, ...showResponse];
      setSearchResults(searchData);
      setSearchDataLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };



  const filteredResults = useMemo(() => {
    if (searchResults.length === 0 || search === "") return [];

    return searchResults.filter((eachResult) => {
      const title = removeSpecialCharacters(eachResult.original_name || eachResult.original_title);
      const searchQuery = removeSpecialCharacters(search);
      return title.includes(searchQuery);
    }).sort((a, b) => b.popularity - a.popularity);
  }, [searchResults, search]);



  useEffect(() => {
    if (search === "") {
      setSearchDataLoading(false);
      return;
    }

    const searchTimer = setTimeout(() => {
      setSearchDataLoading(true);
      let entitySearch = search.trim();

      fetchSearchData(entitySearch);
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [search]);



  function scrollToField() {
    const offset = 80;
    const element = searchField.current;

    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - offset });
    }

    if (search !== "") {
      searchList.current.classList.add("active");
    }
  }



  useEffect(() => {
    function handleClickOutsideSearchList(event) {
      if (searchInput.current && !searchInput.current.contains(event.target)) {
        searchList.current.classList.remove("active");
      }
    }

    document.addEventListener("mousedown", handleClickOutsideSearchList);
    return () => document.removeEventListener("mousedown", handleClickOutsideSearchList);
  }, []);



  return (
    <>
      <p className='slogan'>ReelVault ~ Where the World Watches.</p>
      <StyledSearchBar ref={searchField}>
        <input
          className='search_field'
          type="text"
          placeholder='Search movies & shows...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInput}
          onClick={scrollToField}
          onFocus={scrollToField}
          spellCheck="false"
        />
        <div ref={searchList} className={`search_list ${search !== "" ? "active" : null}`}>
          {searchDataLoading ? (
            <div className="race-by"></div>
          ) : filteredResults.length ? (
            filteredResults.map(eachResult => {
              return <SearchResultCard setSearch={setSearch} key={eachResult.id} eachResult={eachResult} />;
            })
          ) : (
            <div className='no_search_results_container'>
              <img src={sadFace} alt="" />
              <p className='no_search_result'>No results for "{search}"</p>
            </div>
          )}
        </div>
        <img className="search_icon" src={searchIcon} alt="searchIcon" />
      </StyledSearchBar>
    </>
  );
}
