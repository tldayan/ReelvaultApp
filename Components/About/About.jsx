import React, { useEffect, useState } from 'react'
import tmdbLogo from "../../assets/tmdb_logo.svg"
import embedLogo from "../../assets/2embed.png"
import { AboutContainer, FaqMainContainer } from "./About.styles"

export default function About() {
  const [activeFaq, setActiveFaq] = useState(null)

  function toggleAnswer(faqNumber) {
    setActiveFaq(prevFaq => prevFaq === faqNumber ? null : faqNumber)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <AboutContainer>
        <h1 className='about_title'>About</h1>
        <p className='about_info'>Welcome to ReelVault, the movie streaming website that brings cinematic magic to your screen. By integrating the TMDB and 2Embed APIs, we provide an extensive database of movies, ensuring up-to-date information on titles, summaries, ratings, and genres. With the seamless integration of 2Embed, you can enjoy embedded movie trailers and videos, enhancing your browsing experience. Explore our vast library, make informed choices, and embark on an unforgettable cinematic journey at ReelVault.</p>
        <div className='api_logos'>
          <img className='tmdb_logo' src={tmdbLogo} alt="TMDB Logo" />
          <img className='embed_logo' src={embedLogo} alt="2Embed Logo" />
        </div>
      </AboutContainer>
      <FaqMainContainer>
        <h1 className='faq_title'>FAQ</h1>
        <div className='faq_container'>
          <div className='faqs'>
            <h4 onClick={() => toggleAnswer(1)} className='faq_question'>What is ReelVault?</h4>
            <p className={`faq_answer ${activeFaq === 1 ? 'show' : ''}`}>ReelVault is a movie streaming website that offers a wide range of movies for users to watch online. We provide a collection of titles from various genres and ensure up-to-date information on movies, including summaries, ratings, and genres.</p>
          </div>
          <div className='faqs'>
            <h4 onClick={() => toggleAnswer(2)} className='faq_question'>How does ReelVault work?</h4>
            <p className={`faq_answer ${activeFaq === 2 ? 'show' : ''}`}>ReelVault integrates the TMDB and 2Embed APIs to gather movie data and provide a seamless streaming experience. Our extensive database allows users to search and browse movies easily. By integrating 2Embed, we also provide embedded movie trailers and videos for enhanced browsing.</p>
          </div>
          <div className='faqs'>
            <h4 onClick={() => toggleAnswer(3)} className='faq_question'>Do I need to create an account to use ReelVault?</h4>
            <p className={`faq_answer ${activeFaq === 3 ? 'show' : ''}`}>No, you do not need to create an account to use ReelVault. Our website allows users to browse and watch movies without the requirement of creating an account.</p>
          </div>
          <div className='faqs'>
            <h4 onClick={() => toggleAnswer(4)} className='faq_question'>Is ReelVault available in multiple languages?</h4>
            <p className={`faq_answer ${activeFaq === 4 ? 'show' : ''}`}>Currently, ReelVault primarily supports the English language. However, we are working on expanding our language options to provide a more inclusive streaming experience in the future.</p>
          </div>
        </div>
      </FaqMainContainer>
    </>
  )
}
