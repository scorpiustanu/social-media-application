import React, { useRef, useState } from 'react'
import './VideoCard.css'
import VideoHeader from './VideoHeader';
import VideoFooter from './VideoFooter';
const VideoCard = ({ url, likes, shares, channel, avatarSrc, song }) => {
    const [isVideoPlaying, setIsVideoPlaying] = 
    useState(false);
    const videoRef = useRef(null);

    const onVideoPress = () =>{
        if (isVideoPlaying){
            //stop
            videoRef.current.pause()
            setIsVideoPlaying(false)
        }else{
            //play
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }
    
  return (
    <div className='videoCard'>
        <VideoHeader/>
        <video className='videoCard_player'
        ref={videoRef}
        onClick={onVideoPress}
        src={url} 
        alt='reel video'
        loop></video>
        <VideoFooter
      channel = {channel}
      avatarSrc = {avatarSrc}
      song = {song}
      // likes = {likes}
      // shares = {shares}
        />
    </div>
  )
}

export default VideoCard