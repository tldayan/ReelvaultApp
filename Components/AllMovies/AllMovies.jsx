import {React} from 'react'
import {Outlet} from "react-router-dom"
import {NavLink} from "react-router-dom"
import { CategoryButtonsContainer } from './AllMovies.styles'
import ResumeShowsContainer from '../ResumeShowsContainer/ResumeShowsContainer'


const navLinks = [{name: "Popular Shows", path: "/"},
  {name: "Popular Movies", path: "/popular"},
  {name: "Rated Movies", path: "/rated"},
  {name: "Upcoming Movies", path: "/upcoming"},
  {name: "Filter", path: "filter"}]

export default function AllMovies() {


  return (
    <>
    <ResumeShowsContainer />
    <CategoryButtonsContainer>
      {navLinks.map(({name, path}) => {
        return <NavLink key={name} className="category_buttons" to={path}>{name}</NavLink>
      })}
    </CategoryButtonsContainer>

    {<div className='categories_container'>
        <Outlet />
    </div>}
    </>
  )
}
