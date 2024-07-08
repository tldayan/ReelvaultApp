"use client"
import React, {useRef, useState,useEffect } from 'react'
import { StyledLoginSignUpContainer } from "./LoginSignUp.styles"
import { useStytch } from '@stytch/react'
import { createUser } from '../APIs/mongo/createUser'
import { incrementStytchUser } from '../APIs/mongo/incrementStytchUser'

export default function LoginSignupComponent({authType,setAuthType}) {

    const loginSignupContainer = useRef(null)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [serverResponseLoading,setServerResponseLoading] = useState(false)
    const [serverMsg,setServerMsg] = useState(null)
    const stytchClient = useStytch()

  
const handleOAuth = async() => {
  
  try {

  const OAuthReq = await stytchClient.oauth.google.start({
    login_redirect_url: 'https://reelvaultapp.vercel.app',
    signup_redirect_url: 'https://reelvaultapp.vercel.app',
    custom_scopes: ["profile"]
  })

  } catch(err) {
    console.log(err.message)
  }

}


const handleAuth = async(e) => {
  e.preventDefault()

  setServerResponseLoading(true)

  if(authType === "login" && !username && !password) {
    setServerMsg("Username and password are required")
    return
  } else if (authType === "signup" && !username && !password && !email)(
    setServerMsg("Username, password & email are required")
  )

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
      setServerResponseLoading(false)
      setServerMsg("Enter a valid email address");
      return;
  }
    

  if(authType === "login") {

    try {
      let loginResponse = await stytchClient.passwords.authenticate({email,password,session_duration_minutes: 86400})
      setServerMsg(null)
      setAuthType(undefined)
      window.location.reload()

    } catch (err) {
      setServerResponseLoading(false)
      if (err.status_code === 401 || err.status_code === 400 || err.status_code === 404) {
        setServerMsg("Wrong email or password")
      } else {
        setServerMsg("Could not reach Reelvault")
      }
    } finally {
      setServerResponseLoading(false)
    }
    

  } else { // if user is signing up

    try {
  
      let signupResponse = await stytchClient.passwords.strengthCheck({email,password})

      if(signupResponse.valid_password === true) {

        const limitStatus = await incrementStytchUser()

      if(limitStatus === 403) {
        setServerMsg("Sorry, Maximum User limit reached")
        return
      }

        const userData = await stytchClient.passwords.create({email,password,session_duration_minutes: 86400})
        await stytchClient.user.update({user_id : userData.user_id, name : {first_name : username}})        
        const createUserReq = await createUser(username, userData.user_id)
        
        if(createUserReq === 400) {
          setServerMsg("The email address is already taken!")
        } else if(createUserReq === 401) {
          setServerMsg("Unauthorized Credentials")
        }
        setAuthType(undefined)
      } else {
        setServerMsg("Create a strong password with numbers and special characters")
      }

    } catch (err) {
      if(err.status_code === 400) {
        setServerMsg("The email address is already taken!")
      } else {
        setServerMsg("Create a strong password with numbers and special characters")
      }
        
    } finally {
      setServerResponseLoading(false)
    }
  }
}

  useEffect(() => {
    loginSignupContainer.current.style.opacity = !authType ? 0 : 1
    loginSignupContainer.current.style.pointerEvents = !authType ? "none" : "auto"
  },[authType])


  return (
    <>
    <StyledLoginSignUpContainer ref={loginSignupContainer}>
      <>
        <button onClick={() => setAuthType(undefined)} href="/" className={"close_modal_button"}>&#x2716;</button>
          <h3 className={"auth_type"}>{serverResponseLoading ? (authType === "login" ? "Logging..." : "Signing Up") : (authType === "login" ? "Log In" : "Sign Up")}</h3>
        {serverResponseLoading ? <div className='load_animation_black'></div> : <form className={"login_signup_container"} onSubmit={handleAuth}>
          {authType === "signup" && <div className={"inputField_container"}>
            <label htmlFor="user_name">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username"  placeholder='Enter username' id="user_name" required />
          </div>}
          <div className={"inputField_container"}>
            <label htmlFor="user_email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email"  placeholder='Enter email' id="user_email" required />
          </div>
          <div className={"inputField_container"}>
            <label htmlFor="user_password">Password {/* {islogin && <span className={"forgot_password"}>Forgot password?</span>} */}</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Enter password' id="user_password" required />
          </div>
          <p className='server_msg'>{serverMsg}</p>
          <button className='google-btn' onClick={(e) => {e.preventDefault(); handleOAuth();}}>Continue with Google</button>
          <button className={"loginSignup_btn"}>{authType === "login" ? "Login" : "Sign up"}</button>
          {authType === "login" ? <a onClick={() => setAuthType("signup")} className={"no_account"} >Don&apos;t have an account? Sign up.</a> : <a onClick={() => setAuthType("login")} className={"existing_account"} >Already have an account? Log in.</a>}
        </form>}
    </>      
    </StyledLoginSignUpContainer>
    </>
  )
}
