import {React, useEffect, useState} from 'react'
import './CSS/NavBar.css'
import { NavLink, useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useGoogleLogout } from 'react-google-login';

const NavBar = ({BTOS, setSearchedBTOList, setMessage, setShowNotification, setLevel}) => {
  let navigate = useNavigate(); 
  const clientId = '156062482264-s76hfn9fm4ekjpfviqrkqj1bbk3ri7ug.apps.googleusercontent.com';
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutSuccess = (res) => {
    localStorage.clear();
    setMessage("Logged Out Successfully!");
    setLevel("success")
    setShowNotification(true);
    setTimeout(() => {setShowNotification(false)}, 3000);
  };

  const onFailure = () => {
    setMessage("Log Out Failed!(google)");
    setLevel("error")
    setShowNotification(true);
    setTimeout(() => {setShowNotification(false)}, 3000);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const logout = async() => {
    const token = localStorage.getItem("token");
    const google = localStorage.getItem("google");
    if(google){
      signOut();
    }
    // console.log(token);
    if (token) {
      try{
        const res = await axios.post('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/logout','',{ headers: {'Authorization' : `Bearer ${token}`} });
        console.log(res);
        if(res.status===204){
          localStorage.clear();
          let path = `/`; 
          navigate(path);
          window.location.reload(false);
          // setMessage("Logged Out Successfully!");
          // setLevel("success")
          // setShowNotification(true);
          // setTimeout(() => {setShowNotification(false)}, 3000);
        }
      }
      catch(error){
        setMessage("Log Out Failed!");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 3000);
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
      {(setSearchedBTOList==="NA")
        ?<div className = "NavBarSub2"> </div>
        :<div className = "NavBarSub2">
          <TextField  onChange={search} className = "SearchBar" hiddenLabel placeholder="Search For BTO" size="small" variant="outlined" />      
        </div>
      }
      <div className = "NavBarSub3">
        {isLogin ?
        <div className = "NavBarContainer">
          <NavLink className = "NavBarBtn" to="/bookmark" > 
            <div className = "signInBtn"> Bookmark </div>
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
