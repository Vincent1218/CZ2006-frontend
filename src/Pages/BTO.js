import {React, useEffect, useState} from 'react'
import './CSS/BTO.css'
import Grid from '@mui/material/Grid';
import GoogleMapReact from 'google-map-react';
import Rating from '@mui/material/Rating';
import NavBar from '../Components/NavBar'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Alert from '@mui/material/Alert';

const BTO = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [poiName, setPoiName] = useState("");
  const coords = { lat: 1.3521, lng: 103.8198 };

  const [BTO, setBTO] = useState({
    "id": 0,
    "name": " ",
    "est_date": 0,
    "scores_detail": {
      "education": {
        "score": 0,
        "pois": null
      },
      "recreation": {
        "score": 0,
        "pois": null
      },
      "convenience": {
        "score": 0,
        "pois": null
      },
      "transportation": {
        "score": 0,
        "pois": null
      }
    },
    "lat": "",
    "lon": "",
    "preview_image": "",
    "address": "",
    "locality": "",
    "price_by_room": {
      "two_rooms": {
        "lower": 0,
        "higher": 0
      },
      "three_rooms": {
        "lower": 0,
        "higher": 0
      },
      "four_rooms": {
        "lower": 0,
        "higher": 0
      },
      "five_rooms": {
        "lower": 0,
        "higher": 0
      }
    },
    "overview": "",
    "floor_plans_blob_uri": []
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const rating = ["convenience","education","recreation","transportation"]
  const handleClick = (event,j,i) => {
    setAnchorEl(event.currentTarget);
    setPoiName(BTO.scores_detail[rating[j]].pois[i].Name);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getParameterByName= (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
       results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/bto-projects-by-ids?ids=`+getParameterByName('ids'));
        if(res.status===200){
          setBTO(res.data[0]);
          // console.log(res.data[0]);
        }
      }
      catch(error){
        // console.log(error);
      }
    }
    fetchData();
  },[])

  useEffect(() =>{
    setFloorPlans(BTO.floor_plans_blob_uri);
  },[BTO])



  

  return (
  
    <div className="BTOContainer">
      <NavBar/>
      <div className="BTOBox">
        <div className="BTOContainer1">
          <div className="BTOTitle"> {BTO.name} </div>
        </div>    
        <div className="BTOContainer2">
          <div className="BTOSubTitle">EST TOP Date</div>
          <div className="BTOContent">{new Date(BTO.est_date*1000).toLocaleDateString()}</div>
        </div>
        <img className="BTOContainer2 BTOImage" src={BTO.preview_image} />
        <div className="BTOContainer2">
          <div className="BTOSubTitle">Scoring</div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">Education</div>
                <Rating name="read-only" value={BTO.scores_detail.education.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">Recreation</div>
                <Rating name="read-only" value={BTO.scores_detail.recreation.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">Convenience</div>
                <Rating name="read-only" value={BTO.scores_detail.convenience.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">Transportation</div>
                <Rating name="read-only" value={BTO.scores_detail.transportation.score} readOnly />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="BTOContainer2">
          <div className="BTOSubTitle">Address</div>
          <div className="BTOContent">{BTO.address}</div>
        </div>
        <div className="BTOContainer2">
          <div className="BTOSubTitle">Price By Room Type</div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">2 Rooms</div>
                <div className="BTOContent">{BTO.price_by_room.two_rooms.lower ? BTO.price_by_room.two_rooms.lower : "" }-{BTO.price_by_room.two_rooms.higher ? BTO.price_by_room.two_rooms.higher : "" }</div>
              </div>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">3 Rooms</div>
                <div className="BTOContent">{BTO.price_by_room.three_rooms.lower ? BTO.price_by_room.three_rooms.lower : "" }-{BTO.price_by_room.three_rooms.higher ? BTO.price_by_room.three_rooms.higher : "" }</div>
              </div>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">4 Rooms</div>
                <div className="BTOContent">{BTO.price_by_room.four_rooms.lower ? BTO.price_by_room.four_rooms.lower : "" }-{BTO.price_by_room.four_rooms.higher ? BTO.price_by_room.four_rooms.higher : "" }</div>
              </div>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <div className="BTOContainer3">
                <div className="BTOContent">5 Rooms</div>
                <div className="BTOContent">{BTO.price_by_room.five_rooms.lower ? BTO.price_by_room.five_rooms.lower : "" }-{BTO.price_by_room.five_rooms.higher ? BTO.price_by_room.five_rooms.higher : "" }</div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="BTOContainer2">
          <div className="BTOSubTitle">Overview</div>
          <div className="BTOContent">{BTO.overview}</div>
        </div>
        <div className = "BTOContainer2">
          <div className="BTOContainer3">
            <div className="BTOContainer4">
              BTO: <LocationOnIcon fontSize="large" sx={{ color: '#FFAA1C'}}/>
            </div>
            <div className="BTOContainer4">
              Convenience: <LocationOnIcon fontSize="large" sx={{ color: '#FF6363'}}/>
            </div>
            <div className="BTOContainer4">
              Education: <LocationOnIcon fontSize="large" sx={{ color: '#753188'}}/>
            </div>
            <div className="BTOContainer4">
              Recreation: <LocationOnIcon fontSize="large" sx={{ color: '#3E8E7E'}}/>
            </div>
            <div className="BTOContainer4">
              Transportation: <LocationOnIcon fontSize="large" sx={{ color: '#333C83'}}/>
            </div>
          </div> 
          <div className="helperText"> 
            <Alert severity="info">To check facilities' name, click on the pin icon. </Alert>
          </div> 
          <div className = "BTOMapContainer">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDeJCobiAJJYFMzX8YiDabJqHITW1bZg_Y' }}
              defaultCenter = {coords}
              center= {{lat : BTO.lat, lng: BTO.lon }}
              defaultZoom={15}
              margin={[50, 50, 50, 50]}
              options={{ disableDefaultUI: true, zoomControl: true }}
            >
            <div
              lat={Number(BTO.lat)}
              lng={Number(BTO.lon)}
            >
              <LocationOnIcon fontSize="large"
              sx={{ color: '#FFAA1C'}}
              />
            </div>
            {BTO.scores_detail.convenience.pois?.map((poi,i) =>(
              <div
                lat={Number(poi.Lat)}
                lng={Number(poi.Lon)}
                key={i}
              >
                <LocationOnIcon fontSize="large"
                sx={{ color: '#FF6363'}}
                onClick={(e) => handleClick(e,0,i)}
                />
              </div>
            ))}
            {BTO.scores_detail.education.pois?.map((poi,i) =>(
              <div
                lat={Number(poi.Lat)}
                lng={Number(poi.Lon)}
                key={i}
              >
                <LocationOnIcon fontSize="large"
                sx={{ color: '#753188'}}
                onClick={(e) => handleClick(e,1,i)}
                />
              </div>
            ))}
            {BTO.scores_detail.recreation.pois?.map((poi,i) =>(
              <div
                lat={Number(poi.Lat)}
                lng={Number(poi.Lon)}
                key={i}
              >
                <LocationOnIcon fontSize="large"
                sx={{ color: '#3E8E7E'}}
                onClick={(e) => handleClick(e,2,i)}
                />
              </div>
            ))}
            {BTO.scores_detail.transportation.pois?.map((poi,i) =>(
              <div
                lat={Number(poi.Lat)}
                lng={Number(poi.Lon)}
                key={i}
              >
                <LocationOnIcon fontSize="large"
                sx={{ color: '#333C83'}}
                onClick={(e) => handleClick(e,3,i)}
                />
              </div>
            ))}
              <Popover 
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              >
                <div className="poiName">
                  {poiName}    
                </div>
              </Popover>
            </GoogleMapReact>
          </div> 
        </div>
        <ImageList className="BTOContainer2" sx={{ width: 1, height: 800 }} cols={1}>
          {floorPlans.map((floorPlan,i) => (
            <ImageListItem key={i}>
              <img
                src={`${floorPlan}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${floorPlan}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

      </div>
    </div>
  )
}

export default BTO