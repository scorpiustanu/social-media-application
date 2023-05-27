import {useState,useEffect} from "react";
import {Link,useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import {Typography,Box,Stack,} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from './Videos';
import { fetchFromApi } from "../utils/fetchFromApi";
import Navbar from "./Navbar";

const VideoDetail = () => {
    const [videoDetail,setVideoDetail] = useState(null);
    const [videos,setVideos] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetchFromApi(`videos?part=contentDetails,snippet,statistics&id=${id}`)
        .then((data) => setVideoDetail(data.items[0]))
        .catch((err) => {
            console.log(err);
        })

        fetchFromApi(`search?part=snippet,id&relatedToVideoId=${id}&type=video`)
        .then((data) => setVideos(data.items))
        .catch((err) => {
            console.log(err);
        })
    },[id]);

    if(!videoDetail?.snippet) return 'Loading...';

    const {snippet : {title,channelId,channelTitle},statistics : {viewCount,likeCount}} = videoDetail;

    return (
        <>
            <Navbar/>
    
        <Box minHeight={'95vh'} sx={{background:'black'}}>
            <Stack direction={{xs : 'column',md : 'row'}}>
                <Box flex={1}>
                    <Box sx={{width : '100%',position:'sticky',top : '86px'}}>
                        <ReactPlayer width={'100%'} height={'75vh'} url={`https://www.youtube.com/watch?v=${id}`}
                            className='react-player' controls
                        />
                        <Typography color={'#fff'} variant='h5' fontWeight={'bold'} p={2} >
                            {title}
                        </Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{
                            color : '#fff'
                        }} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{sm : 'subtitle1' ,md : 'h6'}} color={'#fff'}>{channelTitle}</Typography>
                                <CheckCircle sx={{fontSize : '12px' , color : 'gray' , ml : '5px'}} />
                            </Link>
                            <Stack direction={'row'} gap="20px" alignItems={"center"}>
                                <Typography variant="body1" sx={{opacity : 0.7}}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1" sx={{opacity : 0.7}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>

                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{md : 1,xs : 5}} justifyContent="center" alignItems={'center'}>
                    <Videos videos={videos} direction="column"/>
                </Box>
            </Stack>

        </Box>
        </>
    )
}

export default VideoDetail