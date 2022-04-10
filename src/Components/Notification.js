import React from 'react'
import Alert from '@mui/material/Alert';
import './CSS/Notification.css';

const Notification = ({showNotification, message, level}) => {
  return (
    <div>
      {showNotification ?
      <Alert className="Notification" severity={level}>{message}</Alert>
      :<div></div>}
    </div>
    
    
  )
}

export default Notification