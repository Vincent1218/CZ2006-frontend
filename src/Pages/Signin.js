import {React, useState} from 'react'
import './CSS/Sign.css'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notification from '../Components/Notification'
import LoginHooks from '../Components/LoginHooks'

const Signin = () => {
  let navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const clickSignin = async() =>{
    if (!validateEmail(email)){
      setMessage("Please enter a valid email!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 3000);
      return;
    }
    if(!password){
      setMessage("Please enter a password!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 3000);
      return;
    }
    const jsSHA = require("jssha");
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    var hash = hashObj.getHash("HEX");
    // console.log(hash)
    const json = JSON.stringify({ email: email, hashed_password: hash});
    try{
      const res = await axios.post('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/login', json);
      if(res.status===200){
        // console.log("User Loggedin")
        // Get jwttoken here
        localStorage.setItem('token', res.data.token)
        // setMessage("Log In Successfully!");
        // setLevel("success")
        // setShowNotification(true);
        // setTimeout(() => {setShowNotification(false)}, 3000);
        let path = `/`; 
        navigate(path);
      }
      else{
        setMessage("Sign In Failed!");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 3000);
      }
    }
    catch(error){
      setMessage("Sign In Failed!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 3000);
    }
    
  }
  
  return (
    <div className="signContainer">
      <Notification showNotification={showNotification} message={message} level={level} />
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
          <div className="googleLine">
            or
          </div>
          <LoginHooks setMessage={setMessage} setShowNotification={setShowNotification} setLevel={setLevel}/>
      </div>
      
    </div>
  )
}

export default Signin