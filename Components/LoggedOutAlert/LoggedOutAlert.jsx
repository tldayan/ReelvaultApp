import React, { useRef,useEffect, useState } from 'react'

import {StyledLoggedOutAlertContainer} from "./LoggedOutAlert.styles"
import { useStytchSession } from '@stytch/react'


export default function LoggedOutAlert() {

  const loggedOutAlertModal = useRef(null)
  const {session} = useStytchSession()
   const [alertPresent, setAlertPresent] = useState(false)
  

  useEffect(() => {

    let isUserLogged = localStorage.getItem("isUserLogged")
    

    if(isUserLogged && !session) {
      document.cookie = `stytch_session=; Max-Age=0; path=/;`;
      document.cookie = `stytch_session_jwt=; Max-Age=0; path=/;`;
      setAlertPresent(true)
      loggedOutAlertModal.current.style.opacity = "1"
      loggedOutAlertModal.current.style.pointerEvents = "auto"
      localStorage.removeItem("isUserLogged")
    } else {
      loggedOutAlertModal.current.style.opacity = "0"
      loggedOutAlertModal.current.style.pointerEvents = "none"
      setAlertPresent(false)
    }
    
  }, [session])

  const closeModal = () => {
    loggedOutAlertModal.current.style.opacity = "0"
    loggedOutAlertModal.current.style.pointerEvents = "none"
    setAlertPresent(false)
  }

  return (
    <>
    {alertPresent && <div className="dark_overlay"></div>}
      <StyledLoggedOutAlertContainer ref={loggedOutAlertModal}>
      <svg onClick={() => closeModal()} href="/" className='close_modal_button' xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"><path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <h1>Session Expired!</h1>
        <p>You have been logged out, Please log back in to continue accessing your saved movies & shows!</p>
      </StyledLoggedOutAlertContainer>
    </>
  )
}
