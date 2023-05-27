import React, { useState } from 'react'
import {ProgressBar,Form,Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import db from "./firebase.js";
// import {collection}  from 'firebase/firestore/lite';

function CreateReel() {

  let [selectedFile,setSelectedFile] = useState(null);
  let [progress,setProgress] = useState(0);
  let [link,setLink] = useState(''); 
  
  const uploadFile = async(e) => {
    try {
      let formdata = new FormData();
      formdata.append('file',selectedFile);
       await axios.post("http://localhost:8080/api/v1/upload/",formdata);

      console.log("after progress");
      // console.log(data.data?.url);
      // setLink(data.data?.url);
    } catch (error) {
      console.log(error);
    }
  }


  function uploadReels({channel,avatarSrc,song,url,likes,shares}){
    
    db.collection("reels").add({
      channel,
      avatarSrc,
      song,
      url,
      likes,
      shares
  }).then(function(docRef){
    console.log(docRef);
  }).catch((error) => {
    console.log("error : " + error);
  })
  }

  const handleSubmit = async(e) => {
    try{
      await uploadFile(e);

      uploadReels();

    }catch(error){
      console.log(error);
    }
    
  }


  return (
    <div style={{backgroundColor:"whitesmoke",width:"60vw",display:"flex",flexDirection:"column",justifyContent:"center",margin:"0 auto"}}>
      <h3 style={{color : "#39068c",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"center"}}>create Reel</h3>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Form method='post' onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Channel</Form.Label>
            <Form.Control type="text" placeholder="Enter Channel" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSongName">
            <Form.Label>song</Form.Label>
            <Form.Control type="text" placeholder="Enter Song Name" />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label> Upload File </Form.Label>
            <Form.Control type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </Form.Group> 

       <Form.Group>
           <Button variant="primary" type="submit" style={{margin:"0 auto"}}>
            Upload
          </Button> 
         </Form.Group>

         {progress != 0 && <ProgressBar  animated now={progress} label={`${progress}%`} />} 
     </Form>
    </div>
    </div>
    
    
     
  )
}

export default CreateReel;