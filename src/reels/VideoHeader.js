import React from 'react'
import './VideoHeader.css';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

const VideoHeader = () => {
  return (
    <div className='videoHeader'>
      <ArrowBackIosIcon/>
      <h3>Reels</h3>
        <FlipCameraIosIcon/>
    </div>
  )
}

export default VideoHeader