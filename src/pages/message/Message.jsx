import React, { useEffect, useState } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import {makeRequest} from "../../axios";
import { red } from "@mui/material/colors";

function Message(){

  let colorPicker = ["#00cc00"]
  let [message,setMessage] = useState("");
  let [ws,setWS] = useState(null);
  let [onlinepeople,setOnlinePeople] = useState([]);
  let [selectedUser,setSelectedUser] = useState(null);
  let [messages,setMessages] = useState([]);
  let [file,setFile] = useState(null);
  let [user_id,setUserId] = useState(null);

  useEffect(()=>{
     let wss = new WebSocket('ws://localhost:8080');
    console.log(wss);
    setWS(wss);

    let {id} = JSON.parse(localStorage.getItem("user"));
    setUserId(id);

    wss.addEventListener('message',handleServerMessage);
  },[selectedUser]);


  function handleServerMessage(e){
    let onlinePeople = (JSON.parse(e.data)?.online);
    let d = JSON.parse(e.data);

    console.log(d.text);

    if(onlinePeople){
      let uniquePeopleMap = new Map();

      onlinePeople.forEach((people) => {
        let {name,userId} = people;
        uniquePeopleMap.set(userId,name);
      });
  
      let arr = [];
      for (let [key, value] of  uniquePeopleMap.entries()) {
        arr.push({userId:key,name : value});
      }
  
      console.log( "length : " + arr.length)
  
      setOnlinePeople(arr);
      console.log(onlinepeople);
    }
    
    if(d?.text){
      if(d.text != ''){
        console.log(d.text);
        console.log(messages);
      
        setMessages((prev) => [...prev,{text : d?.text,isSend : 'N',isBinary : d?.isBinary}])
        console.log(messages);
      }
      
    }
  }

  const uploadfile = async () => {
    try {
        let formdata = new FormData();
        formdata.append('file',file);
        let data= await makeRequest.post("/upload/",formdata);
        console.log(data.data.url);
        
        return data.data.url;
    } catch (error) {
        console.log(error);
    }
    return null;
}

  async function handleMessage(e){
    e.preventDefault();

    console.log(e);

    console.log(message);

    console.log(ws);
    console.log(user_id);

    if(file){
     let url = await uploadfile(file);
     setMessages((prev) => [...prev, { text : url,isBinary : true, isSend : 'Y' }]);

     ws.send(JSON.stringify({
      senderId : user_id,
      text : url,
      recieverId : selectedUser.userId
     }));

    }else{
      let m = JSON.stringify({
        senderId : user_id,
        text : message,
        recieverId : selectedUser.userId
      });
  
      setMessages((prev) => [...prev,{text : message, isBinary : false ,isSend : 'Y'}])
      console.log(messages);
      ws.send(m);
    }
  }


  const handleFileData = (e) => {
    if(e.target?.files[0]){
      setFile(e.target?.files[0])
    }

    console.log(file);
  }
   
   return (
    <>
    <h3 style={{width:"100vw",display:"flex",justifyContent:"center",color:"blue",padding:"4px",backgroundColor:"whitesmoke"}}>Messenger</h3>
    <div style={{width:"95vw",height:"90vh",display:"flex",marginTop:"4vh",marginLeft:"4vw"}}>
      
      <div style={{display:"flex",flex:"0.3",flexDirection:"column",overflowY:"scroll"}}>
        <div style={{display:"flex",justifyContent:"start",gap:"20px",alignItems:"center",backgroundColor:"#009900",borderBottom:"3px solid white",color:"white",fontSize:"24px",padding:"16px"}}>
          <ChatBubbleIcon style={{color:"blue",fontSize:"30px",color:"white"}}/>
          Chat
        </div>
        <div style={{backgroundColor : "#009900",height:"100%"}}>
        {
          onlinepeople.map(({userId,name},index)=>(
            <>{user_id != userId  && <div onClick={(e)=> setSelectedUser({userId,name})} style={{padding:"10px",display:"flex",height:"80px",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{width:"80%",height:"40px",backgroundColor:"white",display:"flex",justifyContent:"start",alignItems:"center",padding:"25px",gap:"16px",fontWeight:"500"}}>
            <span style={{width:"43px",height:"43px",borderRadius:"50%", backgroundColor:colorPicker[index % colorPicker.length],display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"700"}}>{name?.charAt(0)}</span>
            <span>{name}</span>
          </div>
        </div>}</>
          ))
          
        }
        </div>

      </div>
      {/* messages */}
      { selectedUser && <div style={{flex:"0.7",display:"flex",flexDirection:"column",position:"relative",gap:"3px"}}>
        <div className="message">
        <div style={{width:"80%",height:"40px",display:"flex",justifyContent:"start",alignItems:"center",padding:"25px",gap:"16px",fontWeight:"500"}}>
            <span style={{width:"43px",height:"43px",borderRadius:"50%", backgroundColor:"#00cc00",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"700"}}>{selectedUser?.name.charAt(0)}</span>
        </div>

        {/* messages are written here */}
        <div style={{padding : "20px",height:"61vh" ,overflow:"scroll",backgroundColor:"whitesmoke"}}>
          {
            messages.map((ele,index) => {

              return (
                <>
                {!ele?.isBinary && <p key={index} style={{color:"white",backgroundColor:"#5c00e6",width:"40%",clear:"both",float:ele.isSend === 'Y'?'right':'left',padding:"10px",borderRadius:"15px"}}>{ele?.text}</p>}
                {ele?.isBinary && <img style={{width:"150px",height:"150px",clear:"both",float:ele.isSend === 'Y'?'right':'left'}} alt="this is image send" src={ele?.text} />}
                </>
               )
            })
          }

        </div>

        </div>
        <form style={{position:"absolute",bottom:"0",width: "100%",marginBottom:"17px"}}  >
          {/* <input type="file" >
            <AttachFileIcon style={{color:"black"}} onClick={{}} />
          </input> */}

        <label htmlFor="upload-photo" style={{padding: "10px",margin:"3px",color:"green"}}>
          <input
            id="upload-photo"
            width={"10px"}
            name="upload-photo"
            type="file"
            
            onChange={handleFileData}
          />
          </label>
          
          <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Type your message here" style={{flex:"1",marginLeft:"15px",width:"85%",backgroundColor:"whitesmoke",border:"none",borderRadius:"15px",padding:"10px"}} />
          <SendIcon style={{fontSize:"30px",color:"green",cursor:"pointer",marginLeft:"15px"}} onClick={handleMessage}/>
        </form>
      </div>
    }
       
    
    </div>
    </>
   )
}

export default Message;
