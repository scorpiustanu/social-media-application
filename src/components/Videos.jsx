import { Box, Stack } from "@mui/material";
import React from "react";
// import {VideoCard,ChannelCard} from './index';
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

const Videos = ({videos,direction}) => {

    if(!videos){
        return 'Loading...';
    }
    
    return (
        <Stack direction={direction || 'row'} flexWrap={"wrap"} 
        justifyContent={'start'} gap={2}>

            {
               videos && videos.map((video,index) => (
                    <Box key={index}>
                        {video.id.videoId && <VideoCard video={video} />}
                        {video.id.channelId && <ChannelCard ChannelDetail={video} />}

                    </Box>
                ))
            }

        </Stack>
    )
}

export default Videos;