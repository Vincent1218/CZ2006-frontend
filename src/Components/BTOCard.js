import {React, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Rating from '@mui/material/Rating';
import './CSS/BTOCard.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const BTOCard = ({BTO, bookmarkList, setBookmarkList}) => {
  let navigate = useNavigate(); 
  const [markClicked, setMarkClicked] = useState(bookmarkList.includes(BTO.id));  
  const clickCard = () =>{
    let path = `/BTO?ids=${BTO.id}`; 
    navigate(path);
  }

  const bookMark = async (e,id) =>{
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (token) {
      if(markClicked){
        const json = JSON.stringify({ id: id});
        const res = await axios.post('http://172.21.148.171/api/remove-bookmark', json, { headers: {'Authorization' : `Bearer ${token}`} });
        if(res.status===204){
          // console.log("Bookmard removed")
          var filtered = bookmarkList.filter(function(value, index, arr){ 
              return value !== id;
          });
          setBookmarkList(filtered);
        }
        else{
          // console.log("Not Loggin")
        }
      }
      else{
        const json = JSON.stringify({ id: id});
        const res = await axios.post('http://172.21.148.171/api/add-bookmark',  json, { headers: {'Authorization' : `Bearer ${token}`} });
        if(res.status===204){
          // console.log("Bookmard added")
          let tempArr = [...bookmarkList];
          tempArr.push(id);
          setBookmarkList(tempArr);
        }
        else{
          // console.log("Not Loggin")
        }
      }
      setMarkClicked(!markClicked);
    }
    else{
      // console.log("Not Logged In")
    }


    
  }

  return (
    <div className="cardContainer">
    <Card sx={{ boxShadow: 0, maxWidth: 450}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={BTO.preview_image}
          alt="building"
        />
        <CardContent onClick={() => clickCard()}>
          <div className="cardContainer1">
            <div className="cardTitle"> {BTO.name} </div>
            <BookmarkIcon sx={{ color: markClicked ? '#FFE0AC' : '#dddddd'}} onClick={(e) => bookMark(e,BTO.id)}/>
          </div>          
          <div className="cardContainer2">
            <div className="cardSubTitle">EST TOP Date</div>
            <div className="cardDate">{new Date(BTO.est_date*1000).toLocaleDateString()}</div>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">Education</div>
                <Rating name="read-only" size="small" value={BTO.scores_detail.education.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">Recreation</div>
                <Rating name="read-only" size="small" value={BTO.scores_detail.recreation.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">Convenience</div>
                <Rating name="read-only" size="small" value={BTO.scores_detail.convenience.score} readOnly />
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">Transportation</div>
                <Rating name="read-only" size="small" value={BTO.scores_detail.transportation.score} readOnly />
              </div>
            </Grid>
          </Grid>
          <div className="blank"></div>
          <Grid container spacing={2}>
            <Grid Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">2 Rooms</div>
                <div className="cardPrice">{BTO.price_by_room.two_rooms.lower}-{BTO.price_by_room.two_rooms.higher}</div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>  
              <div className="cardContainer1">
                <div className="cardSubTitle">3 Rooms</div>
                <div className="cardPrice">{BTO.price_by_room.three_rooms.lower}-{BTO.price_by_room.three_rooms.higher}</div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">4 Rooms</div>
                <div className="cardPrice">{BTO.price_by_room.four_rooms.lower}-{BTO.price_by_room.four_rooms.higher}</div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="cardContainer1">
                <div className="cardSubTitle">5 Rooms</div>
                <div className="cardPrice">{BTO.price_by_room.five_rooms.lower}-{BTO.price_by_room.five_rooms.higher}</div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  )
}

export default BTOCard