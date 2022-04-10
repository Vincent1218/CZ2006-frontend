import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import './CSS/SideBar.css'
import cx from "classnames";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
// import res from './test.json';

const Sidebar = ({setFilteredBTOList}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDateValue, setStartDateValue] = useState(0);
  const [endDateValue, setEndDateValue] = useState(4081052513000);
  const [location, setLocation] = useState('');
  const [ratingValue, setRatingValue] = useState([0,0,0,0]);
  const [roomValue, setRoomValue] = useState([0,999999999999,0,999999999999,0,999999999999,0,999999999999]);

  useEffect(() => {
    filterBTO();
  },[]);

  useEffect(() => {
    filterBTO();
  }, [startDateValue,endDateValue,location,ratingValue,roomValue]);

  const filterBTO = async () => {
    try{
      // const res = await axios.get(`http://172.21.148.171/api/bto-projects?start-date=${startDateValue}&end-date=${endDateValue/1000}&education-score=${ratingValue[0]}&recreation-score=${ratingValue[1]}&convenience-score=${ratingValue[2]}&transportation-score=${ratingValue[3]}&locality=${location}&two-room-lower=${roomValue[0]}&two-room-higher=${roomValue[1]}&three-room-lower=${roomValue[2]}&three-room-higher=${roomValue[3]}&four-room-lower=${roomValue[4]}&four-room-higher=${roomValue[5]}&five-room-lower=${roomValue[6]}&five-room-higher=${roomValue[7]}`);
      const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/bto-projects?start-date=${startDateValue}&end-date=${endDateValue/1000}&education-score=${ratingValue[0]}&recreation-score=${ratingValue[1]}&convenience-score=${ratingValue[2]}&transportation-score=${ratingValue[3]}&locality=${location}&two-room-lower=${roomValue[0]}&two-room-higher=${roomValue[1]}&three-room-lower=${roomValue[2]}&three-room-higher=${roomValue[3]}&four-room-lower=${roomValue[4]}&four-room-higher=${roomValue[5]}&five-room-lower=${roomValue[6]}&five-room-higher=${roomValue[7]}`);
      if(res.status==200){
        var data = res.data.projects;
        // console.log(data)
        setFilteredBTOList(data);
      }
    } catch(error){
      // console.log(error);
    }
     
  }

  const pickStartDate = (date) =>{
    setStartDateValue(date.getTime());
    // console.log(date.getTime()/1000);
  }

  const pickEndDate = (date) =>{
    setEndDateValue(date.getTime());
    // console.log(date.getTime()/1000);
  }

  const changeRatingValue = (newValue, i) =>{
    let tempArr = [...ratingValue];
    (newValue == null) ? newValue = 0 : newValue = newValue
    tempArr[i] = newValue;
    setRatingValue(tempArr);
    // console.log(newValue);
  }

  const pickLocation = (event) =>{
    setLocation(event.target.value);
    // console.log(event.target.value);
  }

  const pickRoom = (newValue, i) =>{
    let tempArr = [...roomValue];
    if(newValue===999999999999){
      tempArr[2*i] = 0;
    }
    else{
      tempArr[2*i] = (newValue-50000);
    }
    tempArr[2*i + 1] = newValue;
    setRoomValue(tempArr);
  }

  return (
    <div>
      <div className={cx("sideBtn", { "sideBtn-closed": !isOpen })} onClick={() => setIsOpen(!isOpen)}></div>
      <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames={"fade"}
          unmountOnExit
        >
          <div className="sidebarList">
            <div className="form">
              <div className="formContainer">
                <div className="formTitle"> 
                  ESTIMATE DATE OF COMPLETION
                </div>
                <div className = "datePickerContainer">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className = "datePicker">
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="dd/MM/yyyy"
                        value={startDateValue}
                        onChange={pickStartDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className = "datePicker">
                      <DesktopDatePicker
                        label="End Date"
                        inputFormat="dd/MM/yyyy"
                        value={endDateValue}
                        onChange={pickEndDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </LocalizationProvider>
                </div>

              </div>
            </div>
            <div className="form">
              <div className="formContainer">
                <div className="formTitle"> 
                  SCORING
                </div>
                <div className="rateContainer">
                  <div className="rateBlock">
                    Education
                    <Rating
                      name="simple-controlled"
                      value={ratingValue[0]}
                      onChange={(event, newValue) => {
                        changeRatingValue(newValue, 0);
                      }}
                    />
                  </div>
                  <div className="rateBlock">
                    Recreation 
                    <Rating
                      name="simple-controlled"
                      value={ratingValue[1]}
                      onChange={(event, newValue) => {
                        changeRatingValue(newValue, 1);
                      }}
                    />
                  </div>
                  <div className="rateBlock">
                    Convenience 
                    <Rating
                      name="simple-controlled"
                      value={ratingValue[2]}
                      onChange={(event, newValue) => {
                        changeRatingValue(newValue, 2);
                      }}
                    />
                  </div>
                  <div className="rateBlock">
                    Transportation
                    <div className="starBlock">
                      <Rating
                        name="simple-controlled"
                        value={ratingValue[3]}
                        onChange={(event, newValue) => {
                          changeRatingValue(newValue, 3);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form">
             <div className="formContainer">
                <div className="formTitle"> 
                  GENERAL LOCATION
                </div>
                <FormControl fullWidth>
                  <Select
                    labelId="simple-select-label"
                    value={location}
                    displayEmpty
                    hiddenLabel
                    onChange={pickLocation}
                  >
                    <MenuItem value={""}>All Region</MenuItem>
                    <MenuItem value={"Central"}>Central Region</MenuItem>
                    <MenuItem value={"East"}>East Region</MenuItem>
                    <MenuItem value={"North"}>North Regions</MenuItem>
                    <MenuItem value={"NorthEast"}>North-East Regions</MenuItem>
                    <MenuItem value={"West"}>West Regions</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="form">
              <div className="formContainer">
                <div className="formTitle"> 
                  PRICE BY ROOM TYPE
                </div>
                <div className="roomContainer">
                  <div className="roomBlock">
                    <FormControl fullWidth size="small">
                      <InputLabel>2 Rooms</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roomValue[1]}
                        label="2 Rooms"
                        onChange={(event) => {
                          pickRoom(event.target.value, 0);
                        }}
                      >
                        <MenuItem value={999999999999}>All Range</MenuItem>
                        <MenuItem value={50000}>0-50,000</MenuItem>
                        <MenuItem value={100000}>50,000-100,000</MenuItem>
                        <MenuItem value={150000}>100,000-150,000</MenuItem>
                        <MenuItem value={200000}>150,000-200,000</MenuItem>
                        <MenuItem value={250000}>200,000-250,000</MenuItem>
                        <MenuItem value={300000}>250,000-300,000</MenuItem>
                      </Select>
                   </FormControl>
                  </div>
                  <div className="roomBlock">
                    <FormControl fullWidth size="small">
                      <InputLabel>3 Rooms</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roomValue[3]}
                        label="3 Rooms"
                        onChange={(event) => {
                          pickRoom(event.target.value, 1);
                        }}
                      >
                        <MenuItem value={999999999999}>All Range</MenuItem>
                        <MenuItem value={50000}>0-50,000</MenuItem>
                        <MenuItem value={100000}>50,000-100,000</MenuItem>
                        <MenuItem value={150000}>100,000-150,000</MenuItem>
                        <MenuItem value={200000}>150,000-200,000</MenuItem>
                        <MenuItem value={250000}>200,000-250,000</MenuItem>
                        <MenuItem value={300000}>250,000-300,000</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="roomBlock">
                    <FormControl fullWidth size="small">
                      <InputLabel>4 Rooms</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roomValue[5]}
                        label="4 Rooms"
                        onChange={(event) => {
                          pickRoom(event.target.value, 2);
                        }}
                      >
                        <MenuItem value={999999999999}>All Range</MenuItem>
                        <MenuItem value={50000}>0-50,000</MenuItem>
                        <MenuItem value={100000}>50,000-100,000</MenuItem>
                        <MenuItem value={150000}>100,000-150,000</MenuItem>
                        <MenuItem value={200000}>150,000-200,000</MenuItem>
                        <MenuItem value={250000}>200,000-250,000</MenuItem>
                        <MenuItem value={300000}>250,000-300,000</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="roomBlock temp">
                    <FormControl fullWidth size="small">
                        <InputLabel>5 Rooms</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={roomValue[7]}
                          label="5 Rooms"
                          onChange={(event) => {
                            pickRoom(event.target.value, 3);
                          }}
                        >
                        <MenuItem value={999999999999}>All Range</MenuItem>
                        <MenuItem value={50000}>0-50,000</MenuItem>
                        <MenuItem value={100000}>50,000-100,000</MenuItem>
                        <MenuItem value={150000}>100,000-150,000</MenuItem>
                        <MenuItem value={200000}>150,000-200,000</MenuItem>
                        <MenuItem value={250000}>200,000-250,000</MenuItem>
                        <MenuItem value={300000}>250,000-300,000</MenuItem>
                        </Select>
                      </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>

  );
};

export default Sidebar;
