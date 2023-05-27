const Post = require("../model/Post");
const jwt = require("jsonwebtoken");
const Relationship = require("../model/follower.js");
const Comment = require("../model/Comment.js");
const Like = require("../model/like.js");


const moment = require("moment");

const getAllPosts = async (req,res) => {
    try {

        let token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({message : "not authorized"});
        }

        console.log(token);

        jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
            if(err) return res.status(400).json({message : "token expired! please login first"});

            // console.log("hello");
            let posts = await Post.find({});
            // console.log(posts);
            let followerList = await Relationship.find({});

            let arr = [];

            followerList.forEach((val) => {
                if(val.followers.includes(userinfo.id))
                    arr.push(val.userId.toString());
            })

            console.log(arr);

            // console.log("followerList");

            // console.log(followerList);
            
            let filterPost = posts.filter((post) => {
                // console.log(arr[0] + " " + post.userId +  " "  + userinfo.id  + " "+ arr.includes(post.userId));
               return ((post.userId.toString() == userinfo.id.toString()) || ( arr.includes(post.userId.toString())));
            });


            let likes = await Like.find({});

            let ans;
            let result = filterPost.map((ele) => {
                ans = likes.find((e) => e.postId.toString() == ele._id.toString() )

                // console.log(ele + " " + likes);
            //     "_id": "6445184c0d7b4e7e2a655c9f",
            // "desc": "",
            // "url": "http://res.cloudinary.com/dsfrh7irk/image/upload/v1682249804/qlutypnhwlqufdpedrcs.png",
            // "createdAt": "2023-04-23 17:06:44",
            // "userId": "64442c71db3df2159b19e58c",
            // "updatedAt": "2023-04-23T11:36:44.000Z",
                return {_id : ele._id,desc : ele.desc,url : ele.url,createdAt : ele.createdAt,updatedAt : ele.updatedAt,userId : ele.userId ,like:ans.userId};
            })

            console.log(result)

            return res.status(200).json(result);
        });
        

    } catch (error) {
        res.status(500).json(error);
    }
}

const savePost = async(req,res) => {
    try {

        let token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({message : "not authorized"});
        }


        jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
            if(err) return res.status(400).json({message : "token expired! please login first"});

            console.log(userinfo);
            const {desc,url} = req.body;
            let save_post = await Post.create({desc,url,userId : userinfo.id,createdAt : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")});
            let comment = await Comment.create({postId : save_post._id});
            let like = await Like.create({postId : save_post._id});
            return res.status(200).json(save_post._doc);
           
        });

        
    } catch (error) {
        res.status(500).json(error);
    }
}


const getLikeById = async(req,res) => {
    try {
        let {postId} = req.params;

        let like = await Like.findOne({postId});

        res.status(200).json(like);

    } catch (error) {
        res.status(500).json(error);
    }
}

const deletePost = async (req,res) => {

    try {
        const {postId} = req.body;


        let token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({message : "not authorized"});
        }


        jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
            if(err) return res.status(400).json({message : "token expired! please login first"});

            let post = await Post.findOne({postId : postId});

            if(!post){
                return res.status(404).json("there is no such post exist");
            }

            if(post.userId != userinfo.id){
                return res.status(401).json("you are not authorized to do delete operation");
            }

            await Post.deleteOne({postId : post._id});
            await Comment.deleteOne({postId : post._id});
            await Like.deleteOne({postId : post._id});

            return res.status(200).json("deleted successfully");
            
            });

        

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllPosts,
    savePost,
    deletePost,
    getLikeById
}
