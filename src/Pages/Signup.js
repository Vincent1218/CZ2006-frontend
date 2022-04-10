import {React, useState} from 'react'
import './CSS/Sign.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Notification from '../Components/Notification'

const Login = () => {
  let navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const clickSignup = async() =>{
    if (!validateEmail(email)){
      setMessage("Please enter a valid email!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 2000);
      return;
    }
    if(!password){
      setMessage("Please enter a password!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 2000);
      return;
    }
    if(confirmPassword !== password){
      setMessage("Password does not match!");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 2000);
      return;
    }
    const jsSHA = require("jssha");
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password);
    var hash = hashObj.getHash("HEX");
    const json = JSON.stringify({ email: email, hashed_password: hash});
    try{
      const res = await axios.post('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/signup', json);
      if(res.status===201){
        console.log(res);
        localStorage.setItem('token', res.data.token);
        // console.log("User Created");
        let path = `/`; 
        navigate(path);
      }
      else{
        setMessage("Sign Up Failed!");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 2000);
      }
    }
    catch(error){
      if(error.response.status===400){
        setMessage("Email is registered! Please proceed to sign in.");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 2000);
      }
      else{
        setMessage("Sign Up Failed!");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 2000);
      }
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
            <div className="signFormTitle"> Sign Up </div>
            <TextField className="signTextField" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            <TextField className="signTextField" fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" variant="outlined" />
            <TextField error={(confirmPassword !== password)&&(confirmPassword!=="")} helperText={(confirmPassword !== password)&&(confirmPassword!=="") ? 'Password does not match!' : ' '} className="signTextField" fullWidth label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" variant="outlined" />
          </div>
          <Button className="signButton" onClick={clickSignup} variant="contained">Sign Up</Button>
          <div className="signReminder">
            Already have an account? 
            <NavLink className="signLink" to="/signin" > 
              <Button className="signButton1" variant="text">Sign In</Button>
            </NavLink>
          </div>
      </div>
    </div>
  )
}

export default Login