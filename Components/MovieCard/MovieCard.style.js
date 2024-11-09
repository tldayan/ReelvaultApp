import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const StyledMovieLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;

  &:hover {
   background-color: #d2d2d227;


   .movie_poster {
      transform: scale(1.1);
    } 

  }

`