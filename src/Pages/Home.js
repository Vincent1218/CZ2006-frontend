import React from 'react'
import {NavLink} from "react-router-dom";
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
// import '../CSS/Home.css'

const Home = () => {
  return (
    <div className = "home">
      <NavBar/>
      <SideBar/>
      <div> Hello World Hello WorldHello WorldHello WorldHello WorldHello WorldHello World</div>
    </div>
  )
}

export default Home
