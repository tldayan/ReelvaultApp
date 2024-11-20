import React, { useState } from 'react';
import { StyledGeminiAiComponent } from './GeminiAi.styles';
import { fetchGeminiResponse } from '../APIs/Api';
import { register } from 'swiper/element/bundle';
import { Link } from 'react-router-dom';
import playButton from "../../assets/play-solid.svg";
import { StyledEntitiesContainer } from '../ResumeShowsContainer/ResumeShowsContainer.styles';
register();

export default function GeminiAI() {

  const [userPrompt, setUserPrompt] = useState("");
  const [matchedEntities, setMatchedEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [controller, setController] = useState(null);

  const handleGeminiSearch = async() => {
    if (loading && controller) {
      controller.abort();
      setLoading(false);
      setAlert("Request Cancelled!");
      return;
    }

    if (!userPrompt) {
      setAlert('Please provide a description');
      return;
    }

    const newController = new AbortController();
    setController(newController);

    setLoading(true);
    setAlert("Fetching results, this may take a while!");

    try {
      const geminiReq = await fetchGeminiResponse(userPrompt, newController.signal);

      if (Array.isArray(geminiReq)) {
        setMatchedEntities(geminiReq);
        setAlert("");
      } else {
        setMatchedEntities([]);
        setAlert(geminiReq);
      }

    } catch (error) {
      console.log(`ERROR : ${error.name}`);

      if (error.name === "AbortError") {
        setAlert("Request Cancelled!");
      }

      setMatchedEntities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGeminiSearch();
    }
  };

  return (
    <>
      <StyledGeminiAiComponent>
        <div className='gemini_title'>Find Movies & Shows using AI!</div>
        <div className='gemini_container'>
          <input
            className='gemini_search_field'
            type="text"
            placeholder="eg. Movies starring Ryan Reynolds"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleEnterKeyPress}
          />
          <button className='find_btn' onClick={handleGeminiSearch}>
            {loading ? "CANCEL" : "GO"}
          </button>
        </div>
        <p className='alert'>{alert}</p>
      </StyledGeminiAiComponent>

      {<StyledEntitiesContainer>
        {loading ? (
          <div style={{marginTop : "90px", marginBottom : "90px"}} className='load_animation'></div>
        ) : (
          <swiper-container slides-per-view="auto" mousewheel="false">
            {matchedEntities.map(eachEntity => (
              <swiper-slide className="eachEntitySlide" key={eachEntity?.id}>
                <Link
                  style={{ marginTop: "20px" }}
                  className='show_link'
                  to={eachEntity.original_title ?  `/movies/${eachEntity?.id}` : `/tvshows/${eachEntity?.id}/1/1`}
                >
                  {eachEntity.poster_url || eachEntity.poster_path ? (
                    <img
                      className='show_poster'
                      src={`https://image.tmdb.org/t/p/w500${eachEntity.poster_url || eachEntity.poster_path}`}
                      alt="showPoster"
                    />
                  ) : (
                    <div className="movie_poster_skeleton" style={{ width: '154px', height: '231px' }} />
                  )}
                  <div className="hd">HD</div>
                  <div className='resumeShow_cover'>
                    <div className='watch_show_btn'>
                      <img className='play_button' src={playButton} alt="resume_icon" />
                    </div>
                    <p className='show_name'>{eachEntity.original_title || eachEntity.name}</p>
                  </div>
                </Link>
                <h3 className='movie_name'>{eachEntity.original_title || eachEntity.name}</h3>
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </StyledEntitiesContainer>}
    </>
  );
}
