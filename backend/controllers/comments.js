const Comment = require("../model/Comment.js");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const postComment = (req,res) => {
    try {
        const {postId,content} = req.body;

        let token = req.cookies.accessToken;

        if(!token)
            return res.status(401).json("please login first");

        jwt.verify(token,process.env.SECRET_KEY,async (err,userinfo) => {
            if(err)
                return res.status(401).send("token has expired , please login first");

                console.log("add comment successfully");

            let comment = await Comment.findOne({postId});
            comment.comments.push({content,userId : userinfo.id, createdAt : moment( Date.now()).format("YYYY-MM-DD HH:mm:ss") });
            await comment.save();

            return res.status(200).json(comment._doc);
        });

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

const getAllComments = (req,res) => {
    try {
        console.log("hello");
        
        let postId = req.params.postId;

        let token = req.cookies.accessToken;

        if(!token)
            return res.status(401).json("please login first");

        jwt.verify(token,process.env.SECRET_KEY,async (err,userinfo) => {
            if(err)
                return res.status(401).send("token has expired , please login first");

                console.log(postId);
            let commentList = await Comment.find({postId});

            console.log(commentList);

            if(!commentList){
                return res.status(200).json([]);
            }


            return res.status(200).json(commentList);
        });


    } catch (error) {
        res.status(500).json("internal server error");
    }
}

module.exports = {
    postComment,
    getAllComments
}