import {React, useState, useEffect} from 'react';
import './CSS/BookMark.css';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import BTOCard from '../Components/BTOCard';
import axios from 'axios';

const BookMark = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [BTOS, setBTOS] =useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      //get bookmark list
      const token = localStorage.getItem("token");
      var data =[];
      try{
        const res = await axios.get('https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/get-bookmarks', { headers: {'Authorization' : `Bearer ${token}`} });  
        if(res.status === 200){
          setBookmarkList(res.data);
          data = res.data;
        }
      }
      catch(error){
        // console.log(error);
      }
      var stringParam = '';
      for (var i = 0; i < data.length; i++){
        stringParam += ("ids="+data[i]);
        if(i !== data.length-1){
          stringParam += "&";
        }
      }

      if(stringParam){
        try{
          const res = await axios.get(`https://cors-everywhere.herokuapp.com/http://ec2-18-144-59-5.us-west-1.compute.amazonaws.com/api/bto-projects-by-ids?`+stringParam);
          if(res.status===200){
            // console.log(res.data);
            setBTOS(res.data);
          }
        }
        catch(error){
          // console.log(error);
        }
      }
      else{
        // empty
      }
    }
    fetchData();
  },[]);

  return (
    <div className="bookMarkContainer">
      <NavBar/>
      <div className="bookMarkBox">
        <Grid container spacing={6}>
          {BTOS?.map((BTO,i) =>(
            <Grid item xs={4}>
              <BTOCard BTO={BTO} bookmarkList={bookmarkList} setBookmarkList={setBookmarkList}/>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default BookMark