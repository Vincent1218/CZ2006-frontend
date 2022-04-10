import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import Map from '../Components/Map'
import './CSS/Home.css'

const Home = () => {
  const [filteredBTOList, setFilteredBTOList] = useState([]);
  const [searchedBTOList, setSearchedBTOList] = useState('%');
  // console.log(searchedBTOList);
  const [BTOList, setBTOList] =useState([
    {
      id: 1,
      name: "Bidadari Alkaff CourtViews",
      lat: 1.3372993614814639, 
      lng: 103.87395485331143,
      bookmarked: true,
    },
    {
      id: 2,
      name: "EUNOS COURT",
      lat: 1.3347697318704874, 
      lng: 103.93241377229003, 
      bookmarked: false,
    },
  ]);
  return (
    <div className = "home">
      <NavBar BTOS={filteredBTOList.length ? filteredBTOList : BTOList} setSearchedBTOList={setSearchedBTOList}/>
      <SideBar setFilteredBTOList={setFilteredBTOList}/>
      <Map BTOS={(searchedBTOList!='%') ? searchedBTOList : filteredBTOList}/>
    </div>
  )
}

export default Home