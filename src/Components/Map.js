import {React, useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BTOCard from '../Components/BTOCard'
import Popover from '@mui/material/Popover';
import './CSS/Map.css'
import axios from 'axios';

const Map = ({BTOS, setMessage, setShowNotification}) => {
  const coords = { lat: 1.3521, lng: 103.8198 };
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardNo, setCardNo] = useState(0);
  const [bookmarkList, setBookmarkList] = useState([]);

  const handlePopoverOpen = (event,i) => {
    setAnchorEl(event.currentTarget);
    setCardNo(i);
    // console.log(BTOS[i].id);
    // console.log(open)
    // console.log(i)
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    // console.log(open)
  };

  useEffect(async () => {
    const token = localStorage.getItem("token");
    if(token){
      try{
        const res = await axios.get('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/get-bookmarks', { headers: {'Authorization' : `Bearer ${token}`} });  
        if(res.status === 200){
          setBookmarkList(res.data);
        }
        else{
          // console.log("Request failed");
        }
        
      }
      catch(error){
        // console.log(error);
      }
    }
  },[])
  


  const open = Boolean(anchorEl);

  return (
    <div className = "mapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDeJCobiAJJYFMzX8YiDabJqHITW1bZg_Y' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
      {BTOS?.map((BTO,i) =>(
        <div
          lat={Number(BTO.lat)}
          lng={Number(BTO.lon)}
          key={i}
        >
          <LocationOnIcon fontSize="large"
          sx={{ color: '#FFAA1C'}}
          onMouseEnter={(e)=>handlePopoverOpen(e,i)}
          // onMouseLeave={handlePopoverClose}
          />
          
          
        </div>
      ))}
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        <BTOCard setMessage={setMessage} setShowNotification={setShowNotification} BTO={BTOS[cardNo]} bookmarkList={bookmarkList} setBookmarkList={setBookmarkList} />
      </Popover>
      </GoogleMapReact>
    </div>
  )
}

export default Map