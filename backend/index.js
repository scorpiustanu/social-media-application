const express = require("express");
const ws = require('ws');
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const uploadRoute = require("./routes/upload.js");
const Relationship = require("./routes/follower.js");
const commentRoute = require('./routes/comments.js');
const LikeRoute = require("./routes/likes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


dotenv.config();

const app = express();

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials",true);
    next()
})
app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000"
}));
app.use(cookieParser())

const connectionFunc = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected successfully");
    }catch(error){
        throw error;
    }
}

connectionFunc();



mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
    connectionFunc();
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
});


app.use("/api/v1/upload",uploadRoute);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/posts",postRoutes);
app.use("/api/v1/relationship", Relationship);
app.use("/api/v1/comments",commentRoute);
app.use("/api/v1",LikeRoute);


const server = app.listen(process.env.PORT)

const wss = new ws.WebSocketServer({server});

wss.addListener('connection',(connection,req)=>{
   
    let cookies = req.headers.cookie;
    // console.log(cookies);

    let cookie = cookies.split(';').find((cookie) => {
        return cookie.startsWith('accessToken');
    });

    console.log(cookie);

    if(cookie){
        let token = cookie.substring(12);
        console.log(token);

        jwt.verify(token,process.env.SECRET_KEY,{},(err,userData) => {
            if(err) throw err;

            console.log("connection : " + userData)

            const { id ,username} = userData;
            console.log("id : " + id + " username : " + username);
            connection.userId = id,
            connection.username = username;
        })

    }

    [...wss.clients].forEach((client) => {
        console.log("userId : " + client.userId);
        client.send(JSON.stringify({
            online : [...wss.clients].map((c) => ({userId : c.userId,name : c.username}))
        }       
        ));
    })


   connection.on("message",(data) => {
    
    data = JSON.parse(data);

    let recieverClient =[...wss.clients].find((client) => {
        return data?.recieverId?.toString() === (client.userId.toString())
    })

    console.log("data : " + data?.text);

    if(data?.text.startsWith('http')){
        
        recieverClient.send(JSON.stringify({
            text : data.text,
            isBinary : true
        }));


    }else{
        let {senderId,recieverId,text} = data;

        

        if(recieverClient){
            recieverClient.send(JSON.stringify({
                text,
                isBinary : false
            }));
        }

        console.log(senderId + " : " + recieverId + " : "+ text);
    }
   });






    
})

