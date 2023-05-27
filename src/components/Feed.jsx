import React from "react";
import {Stack,Box,Typography} from "@mui/material"
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import {fetchFromApi} from "../utils/fetchFromApi";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

const Feed = () => {

    const [selectedCategory,setSelectedCategory] = useState('New');
    const [videos,setVideos] = useState(null);

    useEffect(()=>{
        fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
        .then((data) => setVideos(data.items))
        .catch((error) => {
            console.log(error);
        })
    },[selectedCategory]);

    return (
        <><Navbar/>
        <Stack
            sx={{flexDirection:{
                sx : "column" , md:"row"
            },
            background:"black"
        }}  
        >

        <Box sx={{padding:'10px',margin:'5px',height:{sx:'auto',md:'92vh',borderRight:'1px solid #3d3d3d',
         px : {sx:0,md : 2}}}}
        >
            <Sidebar
            selectedCategory = {selectedCategory}
            setSelectedCategory = {setSelectedCategory}
            /> 

            <Typography className="copyright"
            sx={{mt:1.5,color:'#fff'}} variant="body2" >
                Copyright 2022 JSM Media 
            </Typography>

        </Box>
        <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
            <Typography variant="h4" fontWeight="bold" mb={2} sx = {{color : "white"}}>
                {selectedCategory} <span style={{color:'#f31503'}}>videos</span>
            </Typography>
            {videos &&  <Videos videos={videos}/>}
        </Box>



        </Stack>
        </>
    )
}

export default Feed;