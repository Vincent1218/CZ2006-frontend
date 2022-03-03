import React from 'react'
import './CSS/NavBar.css'
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <div className = "NavBar">
      <div className = "NavBarSub1">
        <NavLink className = "NavBarBtn Logo" to="/" > Kaya </NavLink>
      </div>
      <div className = "NavBarSub2">

      </div>
      <div className = "NavBarSub3">
        <NavLink className = "NavBarBtn" to="/" > 
          <div className = "signInBtn"> Sign In </div>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
