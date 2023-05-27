
import { useState,useEffect } from 'react';
import './ReelMain.css';
import VideoCard from './VideoCard';
import db from "./firebase"
import { collection, getDocs } from 'firebase/firestore/lite';
// import {channel, avatarSrc, song, url,likes, shares} from 
// const fetchPost = async () => {
       
  // await getDocs(collection(db, "todos"))
  //     .then((querySnapshot)=>{               
  //         const newData = querySnapshot.docs
  //             .map((doc) => ({...doc.data(), id:doc.id }));
  //         setTodos(newData);                
  //         console.log(todos, newData);
  //     })
 
// }



function ReelMain() {
  const [reels,setReels]=useState([]);
  const [flag,setFlag] = useState(false);

const fetchPost=async()=>{
  await getDocs(collection(db,"reels"))
  .then((querySnapshot)=>{
    const newData=querySnapshot.docs.map((doc)=>((doc.data())));
    setReels([...newData]);
    console.log(reels);
  }).catch((err) => {
    console.log(err);
  })
}

useEffect(()=>{
  fetchPost();
  console.log(reels);
}, [])
  return (
    <div className="app">
      <div className="app_top">
        {/* <img className='app_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png?20200512141346" alt="ig-reel" /> */}
        <h1 style={{color:"#ff3333"}}>Reels</h1>
      </div>
      <div className="app_videos">
      {reels.length > 0 && reels.map(({channel, avatarSrc, song, url,likes, shares}) => (
      <VideoCard
      channel = {channel}
      avatarSrc = {avatarSrc}
      song = {song}
      url = {url}
      // likes = {likes}
      // shares = {shares}
      />
      ))}
      </div>
    </div>
  );
}

export default ReelMain;
