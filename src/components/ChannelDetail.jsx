import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { Box } from "@mui/material";

// import {Videos,ChannelCard} from './' 
import Videos from "./Videos.jsx";
import ChannelCard from "./ChannelCard.jsx";
import { fetchFromApi } from "../utils/fetchFromApi.js";
import Navbar from "./Navbar.jsx";


const ChannelDetail = () => {
    const [channelDetail,setChannelDetail] = useState(null);
    const [videos,setVideos] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetchFromApi(`channels?part=snippet&id=${id}`)
        .then((data) => setChannelDetail(data?.items[0]))
        .catch((err) => console.log(err));

        fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
        .then((data) => setVideos(data?.items))
        .catch((err) => console.log(err));
    },[id]);

    return (
        <>
        <Navbar/>
        
        <Box minHeight={'95vh'}>
            <Box>
                <div
                    style = {{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)',
                    zIndex : 10,
                    height : '300px'
                }}/>
                <ChannelCard ChannelDetail={channelDetail} marginTop={'-110px'}/>
            </Box>
            <Box display={'flex'} p='2'>
                <Box sx={{mr : {sm : '100px'}}} />
                <Videos videos={videos}/>
            </Box>

        </Box>

        </>
    )
}

export default ChannelDetail;