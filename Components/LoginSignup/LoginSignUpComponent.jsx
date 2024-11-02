"use client"
import React, {useRef, useState,useEffect } from 'react'
import { StyledLoginSignUpContainer } from "./LoginSignUp.styles"
import { useStytch } from '@stytch/react'
import { createUser } from '../APIs/mongo/createUser'
import { incrementStytchUser } from '../APIs/mongo/incrementStytchUser'
import { useNavigate } from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginSignupComponent({authType,setAuthType,resetRoute}) {

    const loginSignupContainer = useRef(null)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [serverResponseLoading,setServerResponseLoading] = useState(false)
    const [serverMsg,setServerMsg] = useState(null)
    const stytchClient = useStytch()
    const navigate = useNavigate()

const handleOAuth = async() => {
  
  try {

  const OAuthReq = await stytchClient.oauth.google.start({
    login_redirect_url: 'https://reelvault.vercel.app',
    signup_redirect_url: 'https://reelvault.vercel.app',
    custom_scopes: ["profile"],
    prompt: 'select_account'
  })

  } catch(err) {
    console.log(err.message)
  }

}


const handleAuth = async(e) => {
  e.preventDefault()

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")
  const tokenType = searchParams.get("stytch_token_type")

  if(resetRoute && !token) {
    return
  }

  if(tokenType === "reset_password") {

    try {
      const resetPasswordReq = await stytchClient.passwords.resetByEmail({
        token: String(token),
        password: password,
        session_duration_minutes: 60
      });

      if (resetPasswordReq.status_code === 200) {
        closeModal()
      }

    } catch (err) {
      if(err.status_code === 400) {
        setServerMsg("Create a strong password with numbers and special characters(!,@,#,$,%)")
      }
    }

    return
  }


  setServerResponseLoading(true)

  if(authType === "login" && !username && !password) {
    setServerMsg("Username and password are required")
    return
  } else if (authType === "signup" && !username && !password && !email)(
    setServerMsg("Username, password & email are required")
  )

  if (!emailRegex.test(email)) {
      setServerResponseLoading(false)
      setServerMsg("Enter a valid email address");
      return;
  }
    

  if(authType === "login") {

    try {
      let loginResponse = await stytchClient.passwords.authenticate({email,password,session_duration_minutes: 86400})
      localStorage.setItem("isUserLogged", true)
      setServerMsg(null)
      setAuthType(undefined)
      window.location.reload()

    } catch (err) {
      setServerResponseLoading(false)
      if (err.status_code === 401 || err.status_code === 400 || err.status_code === 404) {
        setServerMsg("Wrong email or password")
      } else {
        setServerMsg("Could not reach Reelvault, Try again later")
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
        setServerMsg("Sorry, Maximum User Accounts reached")
        return
      }
    
        const userData = await stytchClient.passwords.create({email,password,session_duration_minutes: 86400})
        localStorage.setItem("isUserLogged", true)
        await stytchClient.user.update({user_id : userData.user_id, name : {first_name : username}})
           
        const createUserReq = await createUser(username, userData.user_id)

        setAuthType(undefined)
      } else {
        setServerMsg("Create a strong password with numbers and special characters(!,@,#,$,%)")
      }

    } catch (err) {
      if(err.status_code === 400) {
        setServerMsg("The email address is already taken!")
      }
        
    } finally {
      setServerResponseLoading(false)
    }
  }
}


const handleForgotPassword = async() => {

  if(email === "") {
    setServerMsg("Enter email to reset password")
    return
  } else if (!emailRegex.test(email)) {
    setServerMsg("Invalid email format")
    return
  }

  setServerMsg("")


  let resetPasswordReq = await stytchClient.passwords.resetByEmailStart({email: email, reset_password_redirect_url: 'https://reelvault.vercel.app/reset'})
  console.log(resetPasswordReq)
  if(resetPasswordReq.status_code === 200) {
    setServerMsg(`An email with instructions to reset your password has been sent to ${email}.`)
  } else if(resetPasswordReq.status_code === 404) {
    setServerMsg(`This email doesn't appear to be in our system.`)
  }

  

}



  useEffect(() => {
    loginSignupContainer.current.style.opacity = !authType ? resetRoute ? 1 : 0 : 1
    loginSignupContainer.current.style.pointerEvents = !authType ? resetRoute ? 'auto' : "none" : "auto"
  },[authType,resetRoute])


  const closeModal = () => {
    setAuthType(undefined)
    navigate("/")
    
  }


  return (
    <>
      <StyledLoginSignUpContainer ref={loginSignupContainer}>
        <svg onClick={closeModal} href="/" className='close_modal_button' xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24"><path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <h3 className={"auth_type"}>{serverResponseLoading ? (authType === "login" ? "Logging..." : "Signing Up") : (resetRoute ? "Reset password" : authType === "login" ? "Log In" : "Sign Up")}</h3>
          {serverResponseLoading ? <div className='load_animation_black'></div> : <form className={"login_signup_container"} onSubmit={handleAuth}>
            {authType === "signup" && <div className={"inputField_container"}>
              <label htmlFor="user_name">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} maxLength={15} type="text" name="username"  placeholder='Enter username' id="user_name" required />
            </div>}
            {!resetRoute && <div className={"inputField_container"}>
              <label htmlFor="user_email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email"  placeholder='Enter email' id="user_email" required />
            </div>}
            <div className={"inputField_container"}>
              <label htmlFor="user_password">{!resetRoute ? "Password" : "New Password"} {(!resetRoute && authType === "login") && <span onClick={handleForgotPassword} className={"forgot_password"}>Forgot password? Reset now</span>}</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder={!resetRoute ? "Enter password" : "Enter new password"} id="user_password" required />
            </div>
            <p className='server_msg'>{serverMsg}</p>
            <button className={"loginSignup_btn"}>{resetRoute ? "Reset" : authType === "login" ? "Login" : "Sign up"}</button>
            {!resetRoute && <button className='google-btn' onClick={(e) => {e.preventDefault(); handleOAuth();}}>Continue with Google</button>}
            {!resetRoute && (authType === "login" ? <a onClick={() => setAuthType("signup")} className={"no_account"} >Don&apos;t have an account? Sign up.</a> : <a onClick={() => setAuthType("login")} className={"existing_account"} >Already have an account? Log in.</a>)}
          </form>}
      </StyledLoginSignUpContainer>
    </>
  )
}
