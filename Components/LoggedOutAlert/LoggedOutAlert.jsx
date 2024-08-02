import React, { useRef,useEffect, useState } from 'react'

import {StyledLoggedOutAlertContainer} from "./LoggedOutAlert.styles"
import { useStytchSession } from '@stytch/react'


export default function LoggedOutAlert() {

  const loggedOutAlertModal = useRef(null)
  const {session} = useStytchSession()
   const [alertPresent, setAlertPresent] = useState(false)

  useEffect(() => {

    let isUserLogged = localStorage.getItem('isUserLogged')
 

    if(isUserLogged && !session) {
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
        <button ref={loggedOutAlertModal} onClick={() => closeModal()} href="/" className={"close_modal_button"}>&#x2716;</button>
        <h1>Session Expired!</h1>
        <p>You have been logged out, Please log back in to continue accessing your saved movies & shows!</p>
      </StyledLoggedOutAlertContainer>
    </>
  )
}
