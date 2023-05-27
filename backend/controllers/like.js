const LikeModel = require("../model/like.js");
const jwt = require("jsonwebtoken");

const increaseLike = async (req,res) => {
    try {

        let { postId } = req.body;

        console.log("post Id" + postId);
        let token = req.cookies.accessToken;
    // console.log(token);

    if(!token){
        return res.status(401).json({message : "not authorized"});
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
        // console.log("ritik");
        if(err) return res.status(400).json({message : "token expired! please login first"});

        
        // console.log("postId");
        let like = await LikeModel.findOne({postId});
        if(like.userId.includes(userinfo.id))
            like.userId.pull(userinfo.id);
        else
            like.userId.push(userinfo.id);
        // console.log(like);
        let r = await like.save();

        console.log(r);
        
        console.log("it work")
        let l = await LikeModel.findOne({postId});
        res.status(200).json(l);

    });

        
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteLike = async (req,res) => {
    try {

        let { postId } = req.body;
        console.log("postId  : " + postId);
        let token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({message : "not authorized"});
        }
    
        jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
            if(err) return res.status(400).json({message : "token expired! please login first"});
            
            let like = await LikeModel.findOne({postId});
            like.userId.pull(userinfo.id);
            await like.save();
            let l = await LikeModel.findOne({postId});
            console.log("its not work");
            res.status(200).json(l);
        });

        
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllLikes = async (req,res) => {
    try {
        let { postId } = req.body;
        let like = await LikeModel.findOne({postId});
        res.status(200).json(like);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    increaseLike,
    deleteLike,
    getAllLikes
}

