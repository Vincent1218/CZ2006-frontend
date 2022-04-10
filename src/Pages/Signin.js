import {React, useState} from 'react'
import './CSS/Sign.css'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  let navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickSignin = async() =>{
    // console.log(email);
    // console.log(password);
    const jsSHA = require("jssha");
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    var hash = hashObj.getHash("HEX");
    // console.log(hash)
    const json = JSON.stringify({ email: email, hashed_password: hash});
    const res = await axios.post('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/login', json);
    if(res.status===200){
      // console.log("User Loggedin")
      // Get jwttoken here
      localStorage.setItem('token', res.data.token)
      let path = `/`; 
      navigate(path);
    }
    else{
      // console.log("Login failed")
    }
  }
  
  return (
    <div className="signContainer">
      <div className="signBox">
          <div className="signLogo">
            Kaya
          </div>
          <div className="signForm">
            <div className="signFormTitle"> Sign In </div>
            <TextField className="signTextField" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            <TextField className="signTextField" fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" variant="outlined" />
          </div>
          <Button className="signButton" onClick={clickSignin} variant="contained">Sign In</Button>
          <div className="signReminder">
            Don't have an account? 
            <NavLink className="signLink" to="/signup" > 
              <Button className="signButton1" variant="text">Sign Up</Button>
            </NavLink>
          </div>
      </div>
    </div>
  )
}

export default Signin