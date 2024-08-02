import {styled,css} from "styled-components"

export const StyledLoggedOutAlertContainer = styled.div`

/*   border : 1px solid #3636362a; */
  position: fixed;
  background-color : aqua;
  top : 50%;
  left : 50%;
  transform : translate(-50%,-50%);
  display : flex;
  justify-content : center;
  flex-direction  : column;
  align-items : center;
  box-shadow: 0px 0px 15px 0px rgba(107, 107, 107, 0.359);
  background-color: #f0f0f0;
  color: black;
  width: min(90%, 400px);
  padding: 5px 10px 20px 10px;
  border-radius: 5px;
  gap: 10px;
  font-family: "Quicksand", sans-serif;
  z-index: 99999999999;
  transition: all ease 0.3s;
  opacity : 0;
  pointer-events : "none";
/*   user-select : "none" */



p {
  text-align : center;
  padding-bottom : 10px  
}

`