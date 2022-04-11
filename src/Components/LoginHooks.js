import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import '../Pages/CSS/Sign.css'
import axios from 'axios';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import { useNavigate } from "react-router-dom";

function LoginHooks({setMessage, setShowNotification, setLevel}) {
  let navigate = useNavigate(); 
  const clientId ='156062482264-s76hfn9fm4ekjpfviqrkqj1bbk3ri7ug.apps.googleusercontent.com';
  const onSuccess = async(res) => {
    // console.log('Login Success: currentUser:', res);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍.`
    // );
    refreshTokenSetup(res);
    const json = JSON.stringify({ id_token: res.tokenId});
    // console.log(res.tokenId);
    try{
      const res = await axios.post('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/google-login', json);
      // console.log(res);
      if(res.status===200){
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('google',"google");
        // setMessage("Log In Successfully!");
        // setLevel("success")
        // setShowNotification(true);
        // setTimeout(() => {setShowNotification(false)}, 2000);
        let path = `/`; 
        navigate(path);
      }
      else{
        setMessage("Sign In Failed!");
        setLevel("error")
        setShowNotification(true);
        setTimeout(() => {setShowNotification(false)}, 2000);
      }
    }
    catch(error){
      setMessage("Sign In Failed!(google)");
      setLevel("error")
      setShowNotification(true);
      setTimeout(() => {setShowNotification(false)}, 2000);
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 `
    // );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="googleSign">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
