import React, { useState } from "react";
import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import Map from '../Components/Map'
import './CSS/Home.css'
import Notification from '../Components/Notification'

const Home = () => {
  const [filteredBTOList, setFilteredBTOList] = useState([]);
  const [searchedBTOList, setSearchedBTOList] = useState('%');
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("");
  // console.log(searchedBTOList);

  return (
    <div className = "home">
      <Notification showNotification={showNotification} message={message} level={level} />
      <NavBar BTOS={filteredBTOList} setSearchedBTOList={setSearchedBTOList}/>
      <SideBar setFilteredBTOList={setFilteredBTOList}/>
      <Map BTOS={(searchedBTOList!=='%') ? searchedBTOList : filteredBTOList} setMessage={setMessage} setShowNotification={setShowNotification} setLevel={setLevel}/>
    </div>
  )
}

export default Home
