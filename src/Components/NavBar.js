import {React, useEffect, useState} from 'react'
import './CSS/NavBar.css'
import { NavLink, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import axios from 'axios';

const NavBar = ({BTOS,setSearchedBTOList}) => {
  let navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      try{
        const res = await axios.post('http://172.21.148.171/api/logout','',{ headers: {'Authorization' : `Bearer ${token}`} });
        if(res.status===204){
          console.log("Logged Out")
          localStorage.clear();
          let path = `/`; 
          navigate(path);
          window.location.reload(false);
        }
      }
      catch(error){
        // console.log(error);
      }
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const search = (e) =>{ 
    var searchContent = e.target.value;

    const tempArr = []; 
    for (var i = 0; i < BTOS.length; i++) {
      if(BTOS[i].name.toLowerCase()
        .includes(searchContent.toLowerCase())) {
          tempArr.push(BTOS[i]);
      }
    }
    setSearchedBTOList(tempArr);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsLogin(true);
    }
  },[])

  return (
    <div className = "NavBar">
      <div className = "NavBarSub1">
        <NavLink className = "NavBarBtn Logo" to="/" > Kaya </NavLink>
      </div>
      <div className = "NavBarSub2">
        <TextField  onChange={search} className = "SearchBar" hiddenLabel placeholder="Search For BTO" size="small" variant="outlined" />      
      </div>
      <div className = "NavBarSub3">
        {isLogin ?
        <div className = "NavBarContainer">
          <NavLink className = "NavBarBtn" to="/bookmark" > 
            <div className = "signInBtn"> BookMark </div>
          </NavLink>
          <div className="userBtn">
            <AccountCircleIcon sx={{ fontSize: 40 , color: '#FFF1AF'  }} onClick={handleClick} />
            <Popover 
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className="logoutContainer">
                <Button onClick={logout} className="logoutBtn" sx={{ color: '#FFAA1C'}}>Log Out</Button>
              </div>
            </Popover>
          </div>
        </div>
        :
        <NavLink className = "NavBarBtn" to="/signin" > 
          <div className = "signInBtn"> Sign In </div>
        </NavLink>
        }
      </div>
    </div>
  )
}

export default NavBar
