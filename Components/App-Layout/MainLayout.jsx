import {NavLink,Link, Outlet, useLocation, useNavigate} from "react-router-dom"
import {React, useEffect, useRef, useState} from 'react'
import { StyledMainApp } from "./MainLayout.styles";
import LoginSignupComponent from "../LoginSignup/LoginSignUpComponent";
import userLogo from "../../assets/user.svg"
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import SearchBar from "../SearchBar/SearchBar";
import MoviesSlider from "../MovieSlider/MoviesSlider";
import { useStytch, useStytchSession, useStytchUser } from "@stytch/react";
import { createUser } from "../APIs/mongo/createUser";
import { checkExistingUser } from "../APIs/mongo/checkExistingUser";
import { incrementStytchUser } from "../APIs/mongo/incrementStytchUser";
import LoggedOutAlert from "../LoggedOutAlert/LoggedOutAlert";
import { fetchWatchlist } from "../../helperFuncs/fetchWatchlist";



const validSearchBarPaths = ["/popular","/","/rated","/upcoming","/filter","/filter/romance","/filter/action","/filter/adventure","/filter/horror","/filter/comedy"]

export default function MainLayout() {

    const [showChevron, setShowChevron] = useState(false);
    const mobileMenu = useRef()
    const hamburger = useRef()
    const [authType, setAuthType] = useState(undefined)
    const {user} = useStytchUser();
    const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem("isDarkMode")) || false);
    const [OauthCompleted,setOauthCompleted] = useState(user?.providers[0]?.provider_type ? true : false)
    const location = useLocation()
    const stytchClient = useStytch()
    const {session} = useStytchSession()
    const navigate = useNavigate()

    const resetRoute = location.pathname.includes("reset")
  
  
    useEffect(() => {

      if(resetRoute) return
      
      let isMounted = true; 
    
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
    
      if (!token) return;
    
      const authenticateOauth = async () => {
        try {
          const oAuthReq = await stytchClient.oauth.authenticate(token, { session_duration_minutes: 86400 });
    
          if (isMounted && oAuthReq.status_code === 200) {
            setOauthCompleted(true);
          }
        } catch (err) {
          console.log(err.status_code);
        } finally {
          if (isMounted) navigate("/");
        }
      };
    
      authenticateOauth();
    
      return () => {
        isMounted = false;
      };
    }, [location.search]);
    


useEffect(() => {


  if (localStorage.getItem("OAuthUserCreated") === 'true') {
    return;
  }

  const handleCreateUser = async () => {
    const isUserExisting = await checkExistingUser(session?.user_id);
    if (isUserExisting) {
      localStorage.setItem("OAuthUserCreated", true);
      navigate("/"); 
      return;
    }

    const limitStatus = await incrementStytchUser();
    if (limitStatus === 403) {
      setOauthCompleted(false);
      navigate("/");
      return;
    }

    const createUserReq = await createUser(user?.name?.first_name, session?.user_id);
    if (createUserReq === 201) {
      localStorage.setItem("OAuthUserCreated", true);
      navigate("/");
    }
  };

  if (OauthCompleted) {
    handleCreateUser();
  }
}, [OauthCompleted, session?.user_id]);

useEffect(() => {

  if(session?.user_id) {
    fetchWatchlist(session?.user_id)
  }

}, [session?.user_id])


useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
  }

  localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode)); 
}, [isDarkMode]);



const toggleDarkMode = () => {
  setIsDarkMode((prevMode) => !prevMode); 
};


    function openHamburger() {
      
        hamburger.current.classList.toggle('open');

        document.body.style.overflow = document.body.style.overflow === "hidden" ?  "auto" : "hidden" 
    
        const isHambugerOpen = hamburger.current.classList.contains("open");
        mobileMenu.current.style.left = isHambugerOpen ? "0%" : "100%";

      }

      function returnHome() {
        mobileMenu.current.style.left = "100%";
        hamburger.current.classList.toggle("open")
        document.body.style.overflow = "auto";
      }
      

      useEffect(() => {
        const handleScroll = () => {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition > 0) {
          setShowChevron(true);
        } else {
          setShowChevron(false); 
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
      },[])


      const handleLogout = async() => {
          
        try {
          const logoutResponse = await stytchClient.session.revoke()

        if(logoutResponse.status_code === 200 || logoutResponse.status_code === 204) {
          localStorage.removeItem("userWatchlist")
          localStorage.removeItem("OAuthUserCreated")
          localStorage.removeItem("isUserLogged")
            navigate("/")
          }

        } catch (err) {
          console.log(err.status_code)
          navigate("/") 
        }
      }


  return (
    <StyledMainApp>
        <header>
            <nav>
                <Link to="/" className="logo">ReelVault</Link>
                <LoggedOutAlert />
                {(authType || resetRoute) && <div className="dark_overlay"></div>}
                {(authType || resetRoute) && <LoginSignupComponent resetRoute={resetRoute} authType={authType} setAuthType={setAuthType} />}
                <ul ref={mobileMenu} className="nav_container">
                    <NavLink to="/" className="nav_links" onClick={returnHome}>Home</NavLink>
                    <NavLink to="watchlist" className="nav_links" onClick={returnHome}>Watchlist</NavLink>
                    <NavLink to="contactus" className="nav_links" onClick={returnHome}>Contact</NavLink>
                    <NavLink to="about" className="nav_links" onClick={returnHome}>About</NavLink>
                </ul>

                  <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>

                <div className="user_profile_container">
                  {session?.user_id && <img className={`userlogo ${user?.providers[0]?.profile_picture_url ? "light" : isDarkMode ? "" : "default"} ${user?.providers[0]?.profile_picture_url ? "oAuth" : ""}`} src={user?.providers[0]?.profile_picture_url || userLogo} alt="user" />}
                  {session?.user_id && <p className="username">{user?.name?.first_name ? user.name.first_name.split(" ")[0] : "..."}</p>}
                </div>
                {session ? <button className="logout_btn" onClick={handleLogout}>Logout</button> : 
                    <>
                      <button className="auth_buttons" onClick={() => setAuthType("login")}>Login</button>
                      <button className="auth_buttons" onClick={() => setAuthType("signup")}>SignUp</button>
                    </> }
                

                <div className="container">
                    <div ref={hamburger} id="hamburger" onClick={openHamburger}>
                        <svg width="50" height="50" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </div>
                </div>
            </nav>
        </header>
        {validSearchBarPaths.includes(location.pathname) && <MoviesSlider />}
        <SearchBar />
        <main>
            <Outlet />
        </main>
        <div onClick={() => window.scrollTo(0,0)} className='chevron_up' style={{ opacity: showChevron ? '1' : '0',cursor: showChevron ? "pointer" : "auto" }}></div>
        <footer>
            <Link to="/" className="logo">ReelVault</Link>
            <p className="copyright">&copy; 2024 ReelVault. All rights reserved.</p>
        </footer>
    </StyledMainApp>
  )
}
