import React from 'react'
import Alert from '@mui/material/Alert';
import './CSS/Notification.css';

const Notification = ({showNotification, message}) => {
  return (
    <div>
      {showNotification ?
      <Alert className="Notification" severity="error">{message}</Alert>
      :<div></div>}
    </div>
    
    
  )
}

export default Notification