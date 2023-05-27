import React from "react";
import {Box,Typography} from "@mui/material"
import Videos from "./Videos";
import {fetchFromApi} from "../utils/fetchFromApi";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SearchFeed = () => {
    const [videos,setVideos] = useState(null);
    const {searchTerm} = useParams();

    useEffect(()=>{
        fetchFromApi(`search?part=snippet&q=${searchTerm}`)
        .then((data) => setVideos(data.items))
        .catch((error) => {
            console.log(error);
        })
    },[searchTerm]);

    return (
        <>
            <Navbar/>
        
        <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
            <Typography variant="h4" fontWeight="bold" mb={2} sx = {{color : "white"}}>
                Search Result for <span style={{color:'#f31503'}}> {searchTerm} </span> videos
            </Typography>
            {videos &&  <Videos videos={videos}/>}
        </Box>
        </>
    )
}

export default SearchFeed;