import {styled,css} from "styled-components"


export const StyledLoginSignUpContainer = styled.div`

/* LOGIN & SIGNUP  */
/* border: 1px solid red; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 10px 0px rgba(107, 107, 107, 0.179);
    background-color: #f0f0f0;
    color: black;
    width: min(90%, 400px);
    padding: 5px 10px 20px 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-family: "Quicksand", sans-serif;
    z-index: 99999999999;
    transition: all ease 0.3s;


  .auth_type {
    color: rgb(0, 0, 0);
  }
  
  .login_signup_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 15px;
  }
  
  .server_msg {
    width: 90%;
    color: #050505c1;
    margin: 0 auto;
    text-shadow: 1px 1px 1px #05050510;
    text-align : center;
  }


  .forgot_password {
    float: right;
    cursor: pointer;
    transition: all ease 0.3s;
    font-size: clamp(0.5rem, 3vw, 0.75rem);
    margin-left: auto;
  }
  
  .forgot_password:hover {
    color: var(--accent);
    text-decoration: underline;
  }
  
  .inputField_container {
    display: flex;
    flex-direction: column;
  }
  .inputField_container label {
    width: 90%;
    margin: 0 auto;
    font-size: 0.8rem;
  }
  .inputField_container input {
    height: 40px;
    border: none;
    text-indent: 5px;
    font-size: 16px;
    outline: none;
    background-color: #e4e4e4;
    width: 90%;
    margin: 0 auto;
    margin-top: 5px;
  }
  .inputField_container input:hover {
    background-color: #e0e0e0;
  }

  
  .loginSignup_btn {
    background-color: rgb(31, 31, 31);
    color: white;
    width: 30%;
    margin: 0 auto;
    border: none;
    outline: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: all ease 0.4s;
    font-weight : bold;
  }
  
  .loginSignup_btn:hover {
    background-color: rgba(0, 0, 0, 0.73);
  }
  
  .no_account, .existing_account {
    text-decoration: none;
    font-size: 0.8rem;
    margin: 0 auto;
    transition: all ease 0.3s;
    margin-top: 15px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.514);
  }
  
  .no_account:hover, .existing_account:hover {
    text-decoration: underline;
    color: black;
  }

  //GOOGLE BUTTON
  .google-btn {
  transition: background-color .3s, box-shadow .3s;
    
  padding: 12px 16px 12px 42px;
  cursor: pointer;
  margin: 0 auto;
  white-space : nowrap;
  border: 1px solid #0000007f;
  border-radius: 5px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
    background-color: #eeeeeeff;
  }
  
  &:active {
    background-color: #eeeeee;
  }
  
  &:focus {
    outline: none;
    box-shadow: 
      0 -1px 0 rgba(0, 0, 0, .04),
      0 2px 4px rgba(0, 0, 0, .25),
      0 0 0 3px #c8dafc;
  }
  
  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
    cursor: not-allowed;
  }
}


/*   .dark_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999;
    background-color: rgba(0, 0, 0, 0.564);
    visibility: hidden;
  } */
  



`