import React from 'react'
import "./sidebar.css";

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import StarsIcon from '@mui/icons-material/Stars';
import {Message,AccountCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";

function Sidebar() {


  return (
    <div className='left'>
            <Link className='link' to={"/home"}>
                <div className='icons' >
                <HomeIcon sx={{fontSize:"29px"}}/>
                <h5 style={{marginLeft:"2px",paddingTop:"3px"}}>Home</h5>
                </div>
            </Link>
            

            <Link  className='link' to={"/explore"}>
                <div className='icons'>
                <ExploreIcon sx={{fontSize:"29px"}}/>
                <h5 style={{marginLeft:"2px",paddingTop:"3px"}}>Explore</h5>
                </div>
            </Link>
            
            <Link  className='link' to={"/message"} >
                <div className='icons'>
                <Message sx={{fontSize:"29px"}}/>
                <h5  style={{marginLeft:"2px",paddingTop:"3px"}} >Messages</h5>
                </div>
            </Link>
            
            <Link  className='link' to={"/saved-video"}>
                <div className='icons'>
                <StarsIcon sx={{fontSize:"29px"}}/>
                <h5  style={{marginLeft:"2px",paddingTop:"3px"}}>Saved Videos</h5>
                </div>
            </Link>
            


            <Link  className='link' to={"/profile"}>
            <div className='icons'>
              <AccountCircle sx={{fontSize:"29px"}}/>
              <h5 style={{marginLeft:"2px",paddingTop:"3px"}}>Profile</h5>
            </div>
            </Link>
            
            
            <Link  className='link' to={"/createpost"}>
                <div>
                <button style={{width:"100%",padding:"10px",marginTop:"5px"}} className='btn btn-primary'>Create Post</button>
                </div>
            </Link>
            

        </div>
  )
}

export default Sidebar