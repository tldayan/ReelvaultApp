import styled from "styled-components";


export const StyledGeminiAiComponent = styled.div`

/* border: 1px solid red; */
margin : 0 auto;
color: var(--primary);
text-align: center;
font-family: "Quicksand", sans-serif;
margin-top: 20px;
width: min(80%, 500px);

.gemini_container {
/*   border: 1px solid aqua; */
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
}

.gemini_title {
  color: #000;
  text-shadow: 0px 2px 1px#1919190e;
  font-size: clamp(0.5rem, 3.5vw, 1rem);
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  background: rgba(255, 253, 160, 1);
  background: -webkit-linear-gradient(
    left,
    #00ffff 0%,
    #97fba0 25%,
    #97b1fb 50%,
    #00ffff 100%
  ) repeat;
  -webkit-background-clip: text;
  -ms-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -ms-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-animation-name: masked-animation;
  -webkit-animation-duration: 50s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

.gemini_search_field {
  box-shadow: 0px 0px 10px#8f8f8f49;
  outline: none;
  width: 100%;
  border-radius: 3px;
  border: 1px solid transparent; 
  background-clip: padding-box; 
  background-color: var(--background);
  text-indent: 4px;
  color: var(--primary);
  position: relative;
  z-index: 1;
  font-family: "Quicksand", sans-serif;
  font-size: 13px;

  /* Adding border animation */
  background: linear-gradient(
      var(--background), /* Background color */
      var(--background)
    ),
    linear-gradient(
      270deg,
      #00ffff,
      #97fba0,
      #97b1fb,
      #00ffff
    ); /* Gradient for border */
  background-origin: border-box;
  background-clip: content-box, border-box;
}

@keyframes border-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.alert {
  width: 80%;
  opacity: 0.5;
  display: block;
  margin: 5px auto 0 auto;
  font-size: clamp(0.5rem, 3vw, 1rem);
}



`